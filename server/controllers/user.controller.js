const express= require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const User= require("../models/user.model.js")
const secret_key=process.env.PRIVATE_KEY
const joi=require("joi")
const doctors=require("../models/doctor.model.js")

async function signup(req,res){
    const {username,email,password}=req.body

    //validations
    const userJoiSchema=joi.object({
        username:joi.string().min(3).max(25).alphanum().required(),
        email:joi.string().email().required(),
        password:joi.string().min(5).max(10).alphanum(),
    })

    const check=userJoiSchema.validate({username,email,password})
    if (check.error) {
        const message = check.error.details[0].message
        console.log(message);
        return res.status(401).json({ message: message })
    }


    const userName=await User.findOne({username:username})
    const userEmail=await User.findOne({email:email})
    if(userName){
        return res.status(401).json({message:"username already exist "})
    }
    if(userEmail){
        return res.status(401).json({message:"email already exist"})
    }
   

    const salt=await bcrypt.genSalt(10)
    const hashedpasword=await bcrypt.hash(password,salt)
    const userResult=await User.create({
        username:username,
        email:email,
        password:hashedpasword,
    })

    console.log(userResult)
    const data={
        _id:userResult._id,
        name:userResult.username,
        email:userResult.email
    }
    const token=jwt.sign(data,secret_key)
    return res.status(200).json({message:"registered successfully" ,token:token});
    
}

async function login(req,res){
    const {email,password}=req.body
    const user=await User.findOne({email:email})
    if(!user){
        return res.status(401).json({message:"user not found"})
    }
    //comparing the password 
    const checkpassword=await bcrypt.compare(password,user.password)
    if(!checkpassword){
        return res.status(401).json({message:"wrong credentials"})
    }
    const data={
        _id:user._id,
        name:user.username,
        email:user.email
    }
    const token=jwt.sign(data,secret_key)
    res.status(200).json({message:"login successfull ",token:token});
}




module.exports={
    signup,
    login,
    
}