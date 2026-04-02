import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import userModel from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import doctorModel from '../model/doctorModel.js';
import appointmentModel from '../model/appointmentModel.js'; 
import axios from 'axios'; 

const getPaystackErrorMessage = (error, fallbackMessage) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallbackMessage
  );
};

// API TO REGISTER USER
const registeruser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      date: new Date()
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API FOR LOGIN USER 
const loginuser = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }

        if (password.length < 8) {
            return res.status(400).json({success: false, message: 'Password must be at least 8 characters long'});
        }
        
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                token
            });
              
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
}

// API TO GET USER DETAILS
const getUserDetails = async (req, res) => {
    try {
      const  userId = req.user;
      // console.log(userId)
      const user = await userModel.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.json({ success: true, user });
      
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: error.message });
    }
}

const updateUser = async (req, res) => {
  try {
    const userId = req.user; // get from auth middleware
    let { name, address, phone, DOB, gender } = req.body;
    const imagefile = req.file;

    if (!name || !address || !phone || !DOB || !gender) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // ensure address is object
    address = typeof address === "string" ? JSON.parse(address) : address;

    // Prepare update data
    const updateData = { name, address, phone, DOB, gender };

    // Upload new image if provided
    if (imagefile) {
      const uploadimg = await cloudinary.uploader.upload(imagefile.path, {
        folder: "doctors",
        resource_type: "image",
      });
      updateData.image = uploadimg.secure_url;
    }

    // Update user
    // const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

    const updatedUser = await userModel.findByIdAndUpdate(
  userId,
  updateData,
  { returnDocument: "after" }
);

    res.status(200).json({ success: true, message: "User profile updated", user: updatedUser });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



const bookAppointment = async (req, res) => {
  try {
    const {docId,slotdate,slotTime} = req.body;
    const userId = req.user;

    if (!docId || !slotdate || !slotTime) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const userdata = await userModel.findById(userId).select('-password');

    if (!userdata) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Atomically check for availability and book the slot to prevent race conditions
    const doctorData = await doctorModel.findOneAndUpdate(
      { 
        _id: docId, 
        available: true,
        [`slots_booked.${slotdate}`]: { $ne: slotTime } 
      },
      { 
        $push: { [`slots_booked.${slotdate}`]: slotTime } 
      },
      { new: true }
    ).select('-password');

    if (!doctorData) {
      return res.status(400).json({ success: false, message: "Slot already booked or doctor not available" });
    }

    // Convert to plain object and remove slots_booked to save in appointment history
    const doctorObj = doctorData.toObject ? doctorData.toObject() : JSON.parse(JSON.stringify(doctorData));
    delete doctorObj.slots_booked;
    
    const appointmentData = {
      userId,
      docId,
      slotdate,
      slotTime,
      userdata,
      doctorData: doctorObj,
      amount: doctorData.fee,
      date: new Date()
    }

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    res.status(201).json({ success: true, message: "Appointment booked successfully", appointment: newAppointment });
  } catch (error) {
     console.log(error)
      res.status(500).json({ success: false, message: error.message });
  }
}



// API TO GET ALL APPOINTMENTS

const listAppointments = async (req, res) => {
  try {

    const userId = req.user
    const appointments = await appointmentModel.find({userId})

    res.status(200).json({ success: true, appointments });

    
    
  } catch (error) {
     console.log(error)
      res.status(500).json({ success: false, message: error.message });
  }

}

// API TO CANCEL APPOINTMENT 
const cancelAppointment = async (req, res) => {

  try {
    const {appointmentId} = req.body;
    const userId = req.user;
    const appointmentData = await appointmentModel.findById(appointmentId);

    // verify appointment user
    if(appointmentData.userId.toString() !== userId){
      return res.status(403).json({ success: false, message: "You are not authorized to cancel this appointment" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true},{new:true})

    //  releasing doc slot
    const { docId ,slotdate,slotTime} = appointmentData;
    await doctorModel.findByIdAndUpdate(
      docId,
      { $pull: { [`slots_booked.${slotdate}`]: slotTime } }
    );

    res.status(200).json({ success: true, message: "Appointment cancelled successfully" });
 
  } catch (error) {
    console.log(error)
      res.status(500).json({ success: false, message: error.message });
  }
}




const paymentPaystack = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.user; // Assuming userId is available from auth middleware

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return res.status(500).json({ success: false, message: "PAYSTACK_SECRET_KEY is not configured" });
    }

    if (!process.env.FRONTEND_URL) {
      return res.status(500).json({ success: false, message: "FRONTEND_URL is not configured" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled === true) {
      return res.status(404).json({ success: false, message: "Appointment not found or cancelled" });
    }

    // Ensure the user initiating payment owns the appointment
    if (appointmentData.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "You are not authorized to pay for this appointment" });
    }

    if (appointmentData.payment) {
      return res.status(400).json({ success: false, message: "Appointment has already been paid for" });
    }

    // Get user email for Paystack
    const userData = await userModel.findById(userId);
    if (!userData || !userData.email) {
      return res.status(404).json({ success: false, message: "User email not found for payment" });
    }

    // Initialize transaction with Paystack
    const paystackResponse = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: userData.email,
        amount: appointmentData.amount * 100, // Paystack amount is in kobo/pesewas (cents)
        callback_url: `${process.env.FRONTEND_URL}/my_appointment`,
        metadata: {
          appointment_id: appointmentId,
          user_id: userId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // console.log("Paystack Data:", paystackData);
    console.log("Paystack Response:", paystackResponse.data);


    if (paystackResponse.data.status) {
      const reference = paystackResponse.data.data.reference;

      await appointmentModel.findByIdAndUpdate(
        appointmentId,
        { paymentReference: reference },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: 'Payment initiated',
        authorization_url: paystackResponse.data.data.authorization_url,
        reference,
      });
    } else {
      console.error('Paystack initialization failed:', paystackResponse.data);
      res.status(500).json({ success: false, message: paystackResponse.data.message || 'Failed to initiate payment with Paystack' });
    }

  } catch (error) {
    console.error('Error initiating Paystack payment:', error);
    res.status(500).json({ success: false, message: getPaystackErrorMessage(error, 'Server error during payment initiation') });
  }
};

const verifyPaystackPayment = async (req, res) => {
  try {
    const { reference } = req.body;
    const userId = req.user;

    if (!reference) {
      return res.status(400).json({ success: false, message: "Payment reference is required" });
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return res.status(500).json({ success: false, message: "PAYSTACK_SECRET_KEY is not configured" });
    }

    const appointmentData = await appointmentModel.findOne({ paymentReference: reference });

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment for this payment reference was not found" });
    }

    if (appointmentData.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "You are not authorized to verify this payment" });
    }

    if (appointmentData.cancelled) {
      return res.status(400).json({ success: false, message: "Cancelled appointments cannot be paid for" });
    }

    if (appointmentData.payment) {
      return res.status(200).json({ success: true, message: "Payment already verified", appointment: appointmentData });
    }

    const verifyResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paystackData = verifyResponse.data?.data;
    console.log("Paystack Data:", paystackData);


    if (!verifyResponse.data?.status || paystackData?.status !== "success") {
      return res.status(400).json({
        success: false,
        message: verifyResponse.data?.message || "Payment verification failed",
      });
    }

    const metadataAppointmentId = paystackData?.metadata?.appointment_id;
    if (metadataAppointmentId && metadataAppointmentId !== appointmentData._id.toString()) {
      return res.status(400).json({ success: false, message: "Payment metadata does not match the appointment" });
    }

    const expectedAmount = appointmentData.amount * 100;
    if (paystackData.amount !== expectedAmount) {
      return res.status(400).json({ success: false, message: "Verified payment amount does not match the appointment fee" });
    }

    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentData._id,
      { payment: true },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error verifying Paystack payment:", error);
    return res.status(500).json({ success: false, message: getPaystackErrorMessage(error, "Server error during payment verification") });
  }
};

export { registeruser, loginuser, getUserDetails,listAppointments, updateUser,bookAppointment ,cancelAppointment,paymentPaystack, verifyPaystackPayment};
