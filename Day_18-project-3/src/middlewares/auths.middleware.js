const jwt = require('jsonwebtoken')
const postModel =  require('../models/post.model')




   async function  authMiddlware(req,res ,next){

     const token = req.cookies.token

     if(!token)
     {
        return res.status(401).json({
            Message:"unautherised access please login first"
        })
     }
      try{
    const decode = jwt.verify(token,process.env.JWT_SECRET)
     const user = await postModel.findOne({
        _id:decode.id
     })
        next()
      }
      catch(error){

        res.status(401).json({
            Message:" Unautherised "
        })

      }
    
}

module.exports = authMiddlware