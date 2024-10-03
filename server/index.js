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

const path=require("path")
const staticpath= path.join(__dirname,"public");
app.use(express.static(staticpath))



app.use("/user",require("./routes/user.routes.js"))
app.use("/admin",require("./routes/admin.routes.js"))














app.listen(port,()=>{
    console.log("server started at",port)
})