const express=require("express")
const router=express.Router()


const {signup,login} = require("../controllers/user.controller.js")
const {bookAppointment,cancelAppointment}=require("../controllers/appointment.controller.js")
router.use("/login",login)
router.use("/signup",signup)
router.use("/bookAppointment",bookAppointment)
router.use("/cancelAppointment/:id",cancelAppointment)


module.exports= router;