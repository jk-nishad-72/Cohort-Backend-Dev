

const jwt = require('jsonwebtoken')
const postModel = require('../models/post.model')



async  function  postsMiddleware(req,res,next){
      const token = req.cookies.token
      if(!token){
        return res.status(401).json({
            Msg:'Unautherised'
        })
      }
      try{
        
       const decode =     jwt.verify(token,process.env.JWT_SECRET)
           
       const user = await postModel.findOne({
        _id:decode.id
       })
          next()
      
      }
       catch(error){
        return res.status(401).json({
            Msg:"unautherised"
        })
       } 
     
}


module.exports = postsMiddleware