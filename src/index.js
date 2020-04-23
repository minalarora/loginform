const validator=require("validator")
const express=require("express")
const app=express()
const path=require("path")
const port=process.env.PORT || 3000
const expressPath=path.join(__dirname,"../public")

app.use(express.static(expressPath))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.post("/",(req,res)=>{
    console.log(req.body)
    try
    {
     const name=req.body.name
     if(!name)
     {
         throw new Error("Provide a name!")
     }
     
     const dob=req.body.dob
     if(!dob)
     {
         throw new Error("Provide a age!")
     }

     var nowDate=Date.now()
     var dobDate=Date.parse(dob)
     var age=Math.round((nowDate-dobDate)/(1000 * 3600 * 24)/365.25)
     if(age < 18)
     {
        throw new Error("Age is less than 18")
     }

     const email=req.body.email
     if(!email)
     {
         throw new Error("Provide a email!")
     }
     if(!validator.isEmail(email))
     {
         throw new Error("Invalid Email")
     }

     const mobile=req.body.mobile
     
     if(!mobile)
     {
         throw new Error("Provide a mobile!")
     }
     if(!validator.isMobilePhone(mobile))
     {
        throw new Error("Invalid Mobile Number!")
     }
     res.send("Validation Successful!")
    }
    catch(e)
    {
     res.send(e.message)
    }
   
})

app.listen(port,()=>{
    console.log("Server is starting")
})
