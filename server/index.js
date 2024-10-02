const express=require("express");
const app=express();
const port=process.env.PORT ||4000;

const dotenv=require("dotenv")
dotenv.config()

const cors=require("cors")
app.use(cors())

const db=require("./dbConfig/dbconfig.js")

app.use(express.json());
app.use(express.urlencoded({extended:true}))





app.use("/user",require("./routes/user.routes.js"))
















app.listen(port,()=>{
    console.log("server started at",port)
})