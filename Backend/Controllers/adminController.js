// APIFOR ADDING DOCTORS



const addDoctor = async (req, res ) =>{
    try {

        const { name, email, password, speciality, degree,experience,about,fees,address } = req.body;

        const imagefile = req.file;

        console.log(imagefile,{ name, email, password, speciality, degree,experience,about,fees,address })



        
    } catch (error) {
        
    }
}


export  {addDoctor};