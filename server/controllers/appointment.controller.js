const express=require("express")
const User=require("../models/user.model")
const doctor=require("../models/doctor.model");
const appointments= require("../models/appointment.model")
const joi=require("joi");



async function bookAppointment(req,res){
    const {firstName,lastName,dept,patientId,doctor,gender,email,phNumber,date,address}=req.body;

    const joiSchema=joi.object({
        email:joi.string().email().required(),
        phNumber:joi.string().min(10).required()
    })

    const check=joiSchema.validate({email,phNumber});
    if(check.error){
        const msg= check.error.details[0].message;
        return res.status(401).json({message:msg});
    }

    const newappointment= await appointments.create({
        firstName,
        lastName,
        dept,
        patientId,
        doctorId:doctor,
        gender,
        email,
        phNumber:parseInt(phNumber),
        date,
        address,
        request:"pending"
    })

    return res.status(200).json({message:"appointment request sent successfully",data:newappointment})
}


async function getAllAppointments(req,res){
    try {
        const allapps= await appointments.find().populate("doctorId");
        return res.status(200).json({data:allapps})
    } catch (error) {
        return res.status(401).json({message:"error in fetching appointmenst!"})
    }
}

async function updateAppointmentStatus(req,res){
    const {status,id}=req.body;

    try {
        const response= await appointments.findByIdAndUpdate({_id:id},{request:status},{new:true}) //new --> to get the updated data.
        return res.status(200).json({message:response});
    } catch (error) {
        return res.status(401).json({message:"error in updating the status"})
    }
}

module.exports={
    bookAppointment,
    getAllAppointments,
    updateAppointmentStatus
}