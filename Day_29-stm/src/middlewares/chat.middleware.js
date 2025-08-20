const chatsModel = require('../models/chats.model')
const jwt = require('jsonwebtoken');

const authModel = require('../models/auth.model')


async function  chatMiddlewate(req,res,next) {

    const token =  req.cookies.token
    if(!token){
        return res.status(409).json({
             Message:"Unauthrised ❌"
        })
      }

    try{
        const decode =  jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user = await authModel.findById(decode.id)
        // console.log(user)
         req.user = user
          next()

    }catch(error){
         return res.status(409).json({
            Message:"Unautherised"
         })
    }
}


module.exports = {
    chatMiddlewate,

}