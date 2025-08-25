
const userAuthModel = require('../models/d34auth.model')
const bcrptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function postRegisterController(req,res) {

      const {fullname:{firstname,lastname},email,password} = req.body;
    //   console.log(firstname,lastname,email,password)

       const userExists = await userAuthModel.findOne({
        email:email
       })

       if(userExists){
        return res.status(409).json({
            Message:" User already exists"
        })
       }

       // has password via bcrptjs
   const hasPassword = await bcrptjs.hash(password,10)

     const newUser = await userAuthModel.create({
        email:email,
        fullname:{firstname:firstname,lastname:lastname},
        password:hasPassword,
     })

      // create tokens 
      
      const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY)

    //   console.log(token)

    res.cookie('token',token)

    res.status(201).json({
        Message:"Register sucessfully",
        user:newUser
    })

    
}

async function postLoginController(req,res) {
    
    const { email,password} = req.body;

    if(!email){
        return res.status(409).json({
            msg:'invalid email'
        })
    }
    const user = await userAuthModel.findOne({email:email})

    if(!user){
        return res.status(409).json({
            msg:" User not found"
        })
    }

    const IspasswrdMatch = await bcrptjs.compare(password,user.password)

    if(!IspasswrdMatch){
        return res.status(409).json({
            msg:'Invalid password '
        })
    }

    // create tokens 
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)

    res.cookie('token',token)

    res.status(200).json({
        Msg:'logged sucesfly',
        user:user
    })
}

async function logoutController(req, res) {
    try {
        // Clear the token cookie
        res.clearCookie('token')
        res.status(200).json({
            message: 'Logged out successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error during logout'
        })
    }
}

async function getUserProfileController(req, res) {
    try {
        // User is already attached to req by authMiddleware
        const user = req.user
        
        // Remove password from user object
        const userWithoutPassword = {
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
        
        res.status(200).json({
            user: userWithoutPassword
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching user profile'
        })
    }
}

module.exports = {
    postRegisterController,
    postLoginController,
    logoutController,
    getUserProfileController
}