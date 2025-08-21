
const jwt = require('jsonwebtoken')
const  userAuthModel = require('../models/d32auth.model')

async function authMiddleware(req,res,next){

       const token = req.cookies.token

       if(!token){
        return  res.status(409).json({
            Message:"Unautherised"
        })
       }

        try{
            
  const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY)

   const user =  await userAuthModel.findById(decode.id)

   req.user = user
   next()
   
        }catch(error){

             return res.status(409).json({
                Message:" Unautherised"
             })
        }

    
}

module.exports ={ authMiddleware}

