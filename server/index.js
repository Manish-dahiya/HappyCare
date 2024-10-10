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


//---------------------------------------------->stripe--------------------

const stripe=require("stripe")(process.env.Stripe_Secret_key)
const { v4: uuidv4 } = require("uuid");  // import uuid.v4

app.post("/payment",(req,res)=>{
    const {product,token}= req.body;  //token is for the user card info.

    const idempotencyKey=uuidv4() //unique key 

    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then((customer)=>{
         stripe.charges.create({
            amount: product.price * 100,   // *100 because Stripe uses cents
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,  // corrected spelling here
            description: `Purchase of: ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country  // ensure this is formatted as expected by Stripe
                }
            }
        }, {
            idempotencyKey  // separate options object with correct key name
        });
    })
    .then((result)=>{res.status(200).json({result})})
    .catch((err)=>console.log(err))
})
















//---------------------------------------------->stripe------------------------------

app.use("/user",require("./routes/user.routes.js"))
app.use("/admin",require("./routes/admin.routes.js"))


app.listen(port,()=>{
    console.log("server started at",port)
})