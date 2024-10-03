const mongoose=require("mongoose")


const appointmentSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    phNumber:String,
    date:String,
    dept:String,
    gender:String,
    address:String,
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"doctors"
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    request:String
})

const appointments= mongoose.model("appointments",appointmentSchema)

module.exports= appointments
