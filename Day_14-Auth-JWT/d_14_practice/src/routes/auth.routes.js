
const express = require('express')

const authRouter = express.Router()
const d14pracauthModel = require('../models/auth.models')




authRouter.get('/user',(req,res)=>{

    res.json({
        message:" New User Welcome "
    })
})

authRouter.post('/register',async(req,res)=>{

           const {username,email,password} = req.body;

        const ifUserExist=    await d14pracauthModel.find({username})

         if(ifUserExist){
             res.status(401).json({
                Message:" Username already Exist's ❌ "
             })
         }

         

       await d14pracauthModel.create({
          username:username,
          email:email,
          password
       })
      console.log(req.body);
      res.json({Message:req.body})
      

})





module.exports = authRouter