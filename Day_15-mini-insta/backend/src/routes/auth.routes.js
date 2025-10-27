

const express = require('express')
const userModel = require('../models/user.model')
const router = express.Router()
var jwt = require('jsonwebtoken');




// router.get('/',(req,res)=>{

//    res.send("hello ")

// })


//* register API :- 

router.post('/register',async(req,res)=>{

    const {username,password} = req.body

// console.log(username,password)

     const existingUser = await userModel.findOne({
        username
     })

     if(existingUser){
        return res.status(409).json({
            message:"username already exists "
        })
     }

    const user = await userModel.create({

        username,password

         
    })

     const token = jwt.sign({
        id:user._id
     },process.env.JWT_SECRET)

      res.cookie('token',token)

     res.status(201).json({
      message:"register sucessfully",
     })


      

})

//* Login API WITH TOKEN :- 

router.post('/login',async(req,res)=>{

     const {username , password} = req.body

      //* cheking for username diya hai bhi ya nahi

      if(!username){
         return res.status(401).json({
            Message:" Invalid UserName"
         })
      }

     //* finding username if database

     const userExist = await userModel.findOne({
      username
     })

   if(!userExist){
      return res.status(401).json({
         Message:" Username not found"
      })
   }
   
   //* cheking password 

   const isPasswordValid = password === userExist.password

   // * false ke liye check karenge 
   if(!isPasswordValid){
      return res.status(401).json({
         Message:"Incorrect password"
      })
   }

    //* Now sab sahi hai token create and login 

    const token = jwt.sign({id:username._id},process.env.JWT_SECRET)
    res.cookie('token',token)
    res.status(200).json({
      Message:"login sucessfully"
    })
})

router.get('/user',async(req,res)=>{

   //  console.log(" all cookies " + req.cookies);  
    

     const token = req.cookies.token;

   //   console.log(token);
  
     


     if(!token){

          res.status(200).json({
            Message: " Unautherized "
          })
     }

   try{
        const decode =  jwt.verify(token,process.env.JWT_SECRET)

     
        const UserDetail = await userModel.findById(decode.id)
   //   console.log(decode);
   //      res.json({
   //    token: token,
   //    decode:decode
   //   })

   res.status(200).json({
      Message:"User Profile ",
      User: UserDetail
   })
   }catch(error){

      res.status(401).json({
         Message:"error " + error
      })
   }
     

})









module.exports=router