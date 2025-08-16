

const  userauthModel = require('../models/userauth.model')
const jwt = require('jsonwebtoken');

async function authMiddlware(req,res,next) {

      const token = req.cookies.token;

      if(!token){

        return res.status(409).json({
            Message:"Unautherised "
        })
      }

      try{

          const decode  = jwt.verify(token,process.env.JWT_SECRET_KEY )
           const user = await userauthModel.findById(decode.id)
           req.user = user;
           next();

      }catch(error){

        return res.status(409).json({
            Message:"Unautherised ",
        })

      }
    

}

module.exports = { authMiddlware}