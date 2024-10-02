const mongoose=require("mongoose")

const userSchema= mongoose.Schema({
    username:{
        type:String
    },
    email:String,
    password:String

})

const User= mongoose.model("user",userSchema)

module.exports=User