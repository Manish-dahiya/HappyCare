const mongoose =require("mongoose")

const doctorSchema= mongoose.Schema({
    name:String,
    avatar:String,
    phNumber:Number,
    email:{
        type:String
    },
    dept:{
        type:String,
        default:"general"
    },
    gender:{
        type:String
    }
})

const doctors=mongoose.model("doctors",doctorSchema);

module.exports=doctors