const mongoose=require("mongoose")

mongoose.connect(process.env.DB_HOST)

const db=mongoose.connection
db.on("open",()=>{
    console.log("database connected successfully")
})

db.on("error",(error)=>{
    console.log("error in db connection ",error)
})

module.exports=db