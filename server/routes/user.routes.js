const express=require("express")
const router=express.Router()


const {signup,login} = require("../controllers/user.controller.js")
router.use("/login",login)
router.use("/signup",signup)


module.exports= router;