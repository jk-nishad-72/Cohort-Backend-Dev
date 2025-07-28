

const express = require('express')
const userauthModel = require('../models/user.model')

const jwt = require('jsonwebtoken')
const router = express.Router()


/*
 *  register feature POST  API
 *  login  feature  POST API
 *  profile show featur GET API 
 *  log out feature   GET API 
 * 
 */

 // register feature POST  API :-
router.post('/register',async(req,res)=>{
       const {username , password} = req.body;
       // cheking for name ya khali hai 
     if(!username){
        return res.status(409).json({
            message:"Inter a Name "
        })
     }
     //usrneme pahle se exist karta hai ya nahi 
     const existUser = await userauthModel.findOne({
        username 
     })
     if(existUser){
        return res.status(409).json({
            Message: " userName exist "
        })
     }
// storing the user name and password in database
 
 const user = await userauthModel.create({
    username,password
 })
// and creating token  using jwt 
  const token =  jwt.sign({id:user._id},process.env.JWT_SECRET)
        // storing the token in cookie
        res.cookie("chacha",token)
      res.status(201).json({
             Message:"registered sucessfully",
            user 
        })
})

 // ✅ login  feature  POST API :- 

 router.post('/login',async(req,res)=>{

      const {username , password} = req.body;
        if(!username){
            return res.status(401).json({
                Message:" Inavalid userName "
            })
        }

         const userExist  = await userauthModel.findOne({
            username
         })

         if(!userExist){
            return res.status(401).json({
                Message:"User can not exist  "
            })
         }

         const checkpassword = password == userExist.password;

         if(!checkpassword){
            return res.status(401).json({
                Message:" Inavalid Password "
            })
         }

          
         const token = jwt.sign({id:userExist._id},process.env.JWT_SECRET)
         res.cookie("chacha",token)
         res.status(200).json({
            Message: " Login succesfully" ,
            token:token
         })
 })

 //*  profile show featur GET API :- 
 router.get('/user',async(req,res)=>{

    const token = req.cookies.chacha

    console.log(token)
    // res.json(
    //     {
    //         token
    //     }
    // )

    if(!token){
        return res.status(401).json({
            Message:"Unautherised "
        })
    }
    try{

       const decode =  jwt.verify(token,process.env.JWT_SECRET)
       console.log(decode)

       const user = await userauthModel.findOne({
        _id:decode.id
       })
       console.log(user)

       res.status(200).json({
        Message:"User Profile ",
        user:user
       })
    }
    catch(error){

        res.status(401).json({
            Message:"Unautherised ivalid token "
        })  
    }

     

 })


 //*  log out feature   GET API 

 router.get('/logout',(req,res)=>{

     res.clearCookie("chacha")


     res.status(200).json({

        Message:"Log out sucessfully"

     })



 })


module.exports = router;
