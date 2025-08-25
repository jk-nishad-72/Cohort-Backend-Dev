
const jwt = require('jsonwebtoken')
const userAuthModel = require('../models/d34auth.model')

async function chatsMiddleware(req,res,next) {

       const token = req.cookies.token

        if(!token){
            return res.status(409).json({
                Msg:'Unautherized',
            })
        }

        try{

             const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY)
             const user = await userAuthModel.findById(decode.id)

             req.user = user
             next();
             
        }catch(error){
             return res.status(409).json({
                msg:' unautherised ',
             })
        }
}

async function authMiddleware(req,res,next) {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:'Unauthorized - No token provided',
        })
    }

    try{
         const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY)
         const user = await userAuthModel.findById(decode.id)

         if(!user){
             return res.status(401).json({
                message:'Unauthorized - User not found',
             })
         }

         req.user = user
         next();
         
    }catch(error){
         return res.status(401).json({
            message:'Unauthorized - Invalid token',
         })
    }
}

module.exports = {
    chatsMiddleware,
    authMiddleware
}