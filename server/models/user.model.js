const mongoose=require("mongoose")

const userSchema= mongoose.Schema({
    username:{
        type:String
    },
    email:String,
    password:String,
    role:{
        type:String,
        default:"user"
    }

})

const User= mongoose.model("user",userSchema)

module.exports=User