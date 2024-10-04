const express=require("express")
const router= express.Router()
const path=require("path")

const {addDoctor,getAllDoctors}=require("../controllers/doctor.controller")
const {getAllAppointments,updateAppointmentStatus}=require("../controllers/appointment.controller")
const multer=require("multer")
const filepath= path.join(__dirname,"../public/docImages")
const diskStorage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,filepath)
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + " "+ file.originalname)
    }

})
const upload= multer({storage:diskStorage})

router.use("/addDoctor",upload.single("avatar"),addDoctor)
router.use("/getAllDoctors",getAllDoctors)
router.use("/getAllAppointments",getAllAppointments)
router.use("/updateAppointmentStatus",updateAppointmentStatus)
router.use("/getAllDoctors",getAllDoctors)


module.exports=router