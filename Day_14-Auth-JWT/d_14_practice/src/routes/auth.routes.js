
const express = require('express')

const authRouter = express.Router()
const jwt = require('jsonwebtoken')
const d14pracauthModel = require('../models/auth.models')




authRouter.get('/user', async(req,res)=>{

            // console.log('all tokens ' , req.cookies);

    const token = req.cookies.token;

    if(!token) {
        res.status(401).json({
            Msg:" Unautherised  "
        })
    }

     try{

        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)

           const user = await d14pracauthModel.findById(decode.id)

           res.status(200).json({
            Message:" User Profile ",
            User:user
           })
        
     }
     catch(error){

         res.status(401).json({
            Message:error
         })

     }


})



authRouter.post('/register',async(req,res)=>{

           const {username,email,password} = req.body;
           if(!username){
            res.status(401).json({
                Message: " Invalid User Name "
            })
           }

        const ifUserExist =  await d14pracauthModel.findOne({username})
         if(ifUserExist){
             res.status(401).json({
                Message:" Username already Exist's ❌ "
             })
         }

         

    const newUserData =   await d14pracauthModel.create({
          username:username,
          email:email,
          password
       })

       // token for the new User 

       const token = jwt.sign({id:newUserData._id},process.env.JWT_SECRET_KEY) 

         res.cookie('token',token)
   
       console.log(token);
       


        
    //   console.log(req.body);

      res.status(201).json({
        Message:" Register Successfull 🎉 ",
         
    })
      

})


authRouter.post('/login',async(req,res)=>{


         const {email,password} = req.body;

         if(!email){
            res.status(401).json({
                Message:"Invalid email"
            })
         }

         //  chack email is exist's

        const IsExist  =     await d14pracauthModel.findOne({
                email
            })

            if(!IsExist){
                res.status(401).json({
                    Msg:" User  can Not exist "
                })
            }
      
        const checkpassword = password === IsExist.password

        if(!checkpassword){
            res.status(401).json({
                Msg:"Incorrect Password "
            })

        }

        //* new token creation

       const token = jwt.sign({id:IsExist._id},process.env.JWT_SECRET_KEY)

       res.cookie('token',token)


       res.status(200).json({
        Message:" Loged In SuccessFully  ",
        User:IsExist
       })

})





module.exports = authRouter