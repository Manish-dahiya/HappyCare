//for the admin
const express=require("express")
const doctors=require('../models/doctor.model')
const joi=require("joi")

async function addDoctor(req,res){
    const {name,phNumber,email,dept,gender}=req.body 
    const avatar= req.file?req.file.filename : null

    const joiSchema=joi.object({
        email:joi.string().email().required(),
        phNumber:joi.string().min(10).required()
    })

    const check=joiSchema.validate({email,phNumber})
    if(check.error){
        const message=check.error.details[0].message
        return res.json({message:message})
    }

    const newDoctor=await  doctors.create({
        name,
        email,
        phNumber,
        dept,
        gender,
        avatar
    })

    return res.json({created:newDoctor})
}


async function getAllDoctors(req,res){
    try {
        const allDocs=await  doctors.find({})
        console.log(allDocs)
        return res.json(allDocs);
        
    } catch (error) {
        return res.status(201).json({message:error})
    }
}

module.exports={
    addDoctor,
    getAllDoctors
}