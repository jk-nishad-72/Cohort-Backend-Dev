
const  express = require('express')

const authRouter = express.Router();
const authModel  = require('../models/auth.models')



 


authRouter.get('/',(req,res)=>{
    res.json({
         Message:" Welcome to  👋 Server "
    })
})

authRouter.post('/register',async(req,res)=>{

    const {username,password} = req.body;

  const newUser =   await authModel.create({
                    username:username,
                    password:password
                })

         res.status(201).json({
            message:"message recieved ",
             newUser:newUser
         })



})

authRouter.post('/login',async(req,res)=>{

       const {username,password} = req.body;

       console.log(username,password);
       

        const isUserFind  = await authModel.find({
            username:username
        })

        console.log(isUserFind);
        

        if(!isUserFind){
            return res.status(401).json({
                 Message:"message not found "
            })
        }

        console.log(isUserFind.password);
        


        const IsUserCorrect =  password === isUserFind.password


        if(!IsUserCorrect){
            return res.status(401).json({
                message:" Invalid password "
            })
        }

       res.status(200).json({
        message:" login succesfully ",
        user:isUserFind
       })
})





module.exports = authRouter