
const jwt =require('jsonwebtoken')
const d20pracAuthModel = require('../models/d20prcauth.model')


async function postMiddlewares(req,res,next) {

     const token = req.cookies.token;
     if(!token){
         res.status(400).json({
            Msg:" Register ... "
         })
     }

     try{
         const decode = jwt.verify(token,process.env.JWT_SECRET)
         const user = await d20pracAuthModel.findById(decode.id)
         req.user =user; 
         next()

     }catch(error){
        res.status(400).json({
            Msg:'Error or Register ... ' + error
        })

     }

    
}

module.exports = {postMiddlewares ,}