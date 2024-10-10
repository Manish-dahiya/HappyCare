import React, { useEffect, useState } from 'react'
import StripeCheckout from "react-stripe-checkout"
import about from "../public/about.png"
function Payment() {

    const [product,setProduct]=useState({
        name:"c++ book",
        price:100,

    })

    const handlePayment=async(token)=>{
        const body={
            token,
            product
        }
       const response= await fetch("http://localhost:4000/payment",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        })
       if(response.status==200){
            const data=await response.json()
            console.log("success :" ,data)
       }
       else{
        console.log("Error")
       }
    }

  return (
    <div className='w-[700px] h-[700px] bg-red'>
     <StripeCheckout 
     stripeKey={process.env.REACT_APP_STRIPE_PUBLISH_KEY} 
     token={handlePayment} 
      name='HappyCare payment '   
      shippingAddress
    billingAddress

    //extra
    image={about}
    description="HappyCare cares a lot" // the pop-in header subtitle
    >
            <button className='bg-red-400 rounded-lg px-2 py-2'>Buy Now</button>
     </StripeCheckout>
    </div>
  )
}

export default Payment
