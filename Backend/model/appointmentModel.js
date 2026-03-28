import moogoose from "mongoose";


const appointmentSchema = new moogoose.Schema({
    userId :{type: String,required: true},
    docId :{type: String,required: true},
    slotdate :{type: String,required: true},
    slotTime :{type: String,required: true},
    userdata :{type: Object,required: true},
    doctorData :{type: Object,required: true},
amount : {type: Number,required: true},
    date: {type: Date, default: Date.now},
    cancelled: {type: Boolean, default: false},
    payment: {type: Boolean, default: false},
    paymentReference: { type: String, default: "" },
    isCompleted: {type: Boolean, default: false},

})


const appointmentModel = moogoose.models.appointment || moogoose.model("appointment", appointmentSchema);

export default appointmentModel; 
