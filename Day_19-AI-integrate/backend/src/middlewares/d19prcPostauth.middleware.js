
const d19authPrcModel  = require('../models/auth.models')
const jwt = require('jsonwebtoken')



async function authMiddleware(req,res,next) {

     const token = req.cookies.token;

     if(!token){
        res.status(401).json({
        Message:"Register ..."
        })
     }
     try{
         
        const decode = jwt.verify(token,process.env.JWT_SECRET)

        const findedUser = await d19authPrcModel.findById(decode.id)

          if(!findedUser){
            return res.status(401).json({
                Msg:" Register...  "
            })
          }

          next()

     }catch(error){

         return res.status(401).json({
            Message:" Unautherised "
         })

     }
     
    
}

module.exports ={ authMiddleware , }