

const express = require('express')
const userauthModel = require('../models/userauth.model')
const jwt = require('jsonwebtoken')
const userauthRouter = express.Router()

// * register api 
userauthRouter.post('/register',async(req,res)=>{

     const {username,password} = req.body
       if(!username){
        return res.status(409).json({
            Message:" Invalid Username",
        })
       }
       const newuserauth  =  await userauthModel.create({
            username:username,
            password:password
           })

        const token =  jwt.sign({id:newuserauth._id},process.env.JWT_SECRET) 
      
       res.cookie("token",token)

        res.status(201).json({
            Message:" Register sucessfully ",
            token:token
        })
})



//* user get api [protected]

userauthRouter.get('/user',async(req,res)=>{
      
    // console.log("All cookies:", req.cookies); 

     const token = req.cookies.token;
    //  console.log(token)


     if(!token){ 
        return res.status(409).json({
            Message:" Invalid token "
        })
     }
     try{

      const decode =  jwt.verify(token,process.env.JWT_SECRET)

    //   console.log(decode.id)

   const user = await userauthModel.findById(decode.id);

    // console.log(user);
    
      res.status(200).json({
        Message:" profile ",
        user:user
      })
     }
     catch(error){

         console.log(" error ")

     }
     
})



//* login api  and creating a new token 


userauthRouter.post('/login',async(req,res)=>{

       const {username,password}  = req.body

       if(!username){
        return res.status(401).json({
            Message:"Invalid username "
        })
       }

   const userExist = await userauthModel.findOne({
            username
         })

         //* if username not exist then
         if(!userExist){
            return res.status(401).json({
                Message:"username not found "
            })
         }

          //* password cheking   (===) ayega true ya false 

     const checkpassword = password === userExist.password
     

     // * cheking password is false 
     if(!checkpassword){
         return res.status(200).json({
            Message:"Incorrect password"
         })
     }

      // * create new token during login
  const token =      jwt.sign({id:userExist._id} , process.env.JWT_SECRET)

  res.cookie('token',token)
  console.log(token);
  

  res.status(200).json({
    Message:"login sucessfuly"
  })

})




module.exports = userauthRouter



