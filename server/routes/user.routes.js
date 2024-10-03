const express=require("express")
const router=express.Router()


const {signup,login} = require("../controllers/user.controller.js")
const {bookAppointment}=require("../controllers/appointment.controller.js")
router.use("/login",login)
router.use("/signup",signup)
router.use("/bookAppointment",bookAppointment)


module.exports= router;