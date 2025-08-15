

const { use } = require('react');
const authModel = require('../models/userauth.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//* regiseter controller 
async function  postRegisterController(req,res) {

     const { fullname:{firstname,lastname},email,password}  = req.body;


     const UserExist = await authModel.findOne({$or:[
         {email:email},
         {fullname:{firstname:firstname,lastname:lastname}}
     ]})

     if(UserExist){
        return res.status(409).json({
            Message:" User already exists  "
        })
     }
 
     //* Password Hashing 

      const hasPassword = await bcrypt.hash(password,10);

      //* Create User in database
     const newUser = await authModel.create({
        fullname:{firstname:firstname,lastname:lastname},
        email:email,
        password:hasPassword
     })
// * Create JWT Token

const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY)

   res.cookie('token',token) 

   res.status(201).json({
    Message:"User Created Successfully",
    User:newUser
   })


    
}

//* login controller 

async function postLoginController(req,res) {

      
     const {email,password} = req.body;

     const userExist = await authModel.findOne({email:email});

     if(!userExist){
        return res.status(409).json({
            Message:"User not found"
        })
     }

     const isPasswordMatch = await bcrypt.compare(password,userExist.password)

     if(!isPasswordMatch){

        return res.status(409).json({
            Message:"Password Invalid"
        })
     }

     //* Create JWT Token

     const token = jwt.sign({id:userExist._id},process.env.JWT_SECRET_KEY)

     res.cookie('token',token)


     res.status(200).json({
        Message:" User Logged in SuccessfullY ",
        User:userExist
     })

}


module.exports = {

    postRegisterController,
    postLoginController

}