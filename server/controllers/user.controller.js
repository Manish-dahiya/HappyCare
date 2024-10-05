const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user.model.js")
const secret_key = process.env.PRIVATE_KEY
const joi = require("joi")
const doctors = require("../models/doctor.model.js")

//for the normal user
async function signup(req, res) {
    const { username, email, password, role } = req.body
    //validations
    const userJoiSchema = joi.object({
        username: joi.string().min(3).max(25).required(),
        email: joi.string().email().required(),
        password: joi.string().min(5).max(10).alphanum(),
    })

    const check = userJoiSchema.validate({ username, email, password })
    if (check.error) {
        const message = check.error.details[0].message
        console.log(message);
        return res.status(401).json({ message: message })
    }


    const userName = await User.findOne({ username: username })
    const userEmail = await User.findOne({ email: email })
    if (userName) {
        return res.status(401).json({ message: "username already exist " })
    }
    if (userEmail) {
        return res.status(401).json({ message: "email already exist" })
    }


    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)

    if (role =="user") {

        const userResult = await User.create({
            username: username,
            email: email,
            password: hashedpassword,
        })

        
        const data = {
            _id: userResult._id,
            name: userResult.username,
            email: userResult.email
        }
        const token = jwt.sign(data, secret_key)
        return res.status(200).json({ message: "registered successfully", token: token });
    }
    else { //admin
        const newAdmin= await User.create({
            username,
            email,
            password:hashedpassword,
            role:"admin"
        })
        console.log(newAdmin)
        const adminData={
            _id:newAdmin._id,
            name:newAdmin.username,
            email:newAdmin.email
        }
        const token= jwt.sign(adminData,secret_key)
        return res.status(200).json({message:"registered successfully",token});
    }

}
//for the normal user
async function login(req, res) {
    const { email, password, role } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(401).json({ message: "user not found" })
    }
    //comparing the password 
    const checkpassword = await bcrypt.compare(password, user.password)
    if (!checkpassword) {
        return res.status(401).json({ message: "wrong credentials" })
    }
    if(role=="admin"){
        if(user.role!="admin"){
            return res.status(401).json({message:"user role does not match"});
        }
    }
   
        const data = {
            _id: user._id,
            name: user.username,
            email: user.email
        }
      
        const token = jwt.sign(data, secret_key)
     return  res.status(200).json({ message: "login successfull ", token: token });
    
}
async function verifyToken(req,res){
    const {token}=req.body;
    jwt.verify(token,secret_key,(err,decode)=>{
        if(err){
            return res.status(401).json({response:"Token is invalid or expired"})
        }
        else{
            res.status(200).json({response:"valid token"});
        }
    })
}






module.exports = {
    signup,
    login,
    verifyToken
}