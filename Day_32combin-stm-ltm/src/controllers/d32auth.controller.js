
const userAuthModel = require('../models/d32auth.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//* register controller
async function registerController(req,res) {
    
    const {fullname:{firstname,lastname},email,password} = req.body;

    const userExist  = await userAuthModel.findOne({
        $or:[
            {email:email},
            {fullname:{firstname:firstname,lastname:lastname}}
        ]
    })

    if(userExist){
        return res.status(409).json({
            Message:' User already exists '
        })
    }

     const hassPassword = await bcrypt.hash(password ,10)

     const newUser = await userAuthModel.create({
        email:email,
        fullname:{
            firstname:firstname,
            lastname:lastname,
        },
        password:hassPassword
     })

    const token =  jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY);

      res.cookie('token',token)


      res.status(201).json({
        Message:" Register sucessfully 🎉",
        user:newUser
      })
}

// * login controller

async function loginController(req,res) {
 
     const { email , password} = req.body;

      //* aya hai ki nahi check karenge 

      if(!email){

         return res.status(409).json({
            Message:" Invalid email"
         })
      }

      const user = await userAuthModel.findOne({
        email:email
      })

       if(!user){
        return res.status(409).json({
            Message:" User not found "
        })
       }

       const isMathpassword = await bcrypt.compare(password,user.password)

       if(!isMathpassword){
        return res.status(409).json({
            Message:" Invalid Password "
        })
       }

       const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)

       res.cookie('token',token)

       res.status(200).json({
        Message:"loged In sucessfully 🎉",
        user:user
       })

    
}



module.exports ={registerController , loginController}

