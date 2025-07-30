
const authsModel = require('../models/auth.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


async function registerController(req,res) {
    
    const {username , password} = req.body

    if(!username)
    {
        return res.status(401).json(
            {
                Message:"Invalid name "
            }
        )
    }

            const usernameExist =   await authsModel.findOne({
                username
               })

     if(usernameExist){
        return res.status(401).json({
            Message:" Username already exists"
        })
     }
 
       const newuser = await authsModel.create({
        username,
        password:await bcrypt.hash(password,10)
       })
       
    
  const token =jwt.sign({id:newuser._id} , process.env.JWT_SECRET)

          res.cookie('token',token)

          res.status(201).json({
            Message:" register sucessfuly"
          })


}

async function loginController(req,res) {

     const {username , password} = req.body

     if(!username){
        return res.status(401).json({
            Message:"Invalid username"
        })
     }
     
      const userExist = await authsModel.findOne({
                username
               })

    if(!userExist){
        return res.status(401).json({
             Message:" username not exists"
        })
    }

          const isMatchPassword = await bcrypt.compare(password,userExist.password)

      if(!isMatchPassword) {
        return res.status(401).json({
            Message:" Incorrect password"
        })
      }   

      const token = jwt.sign({id:userExist._id},process.env.JWT_SECRET)

      res.cookie('token',token)

      res.status(200).json({
        Message:" Login sucessfuly"
      })

    
}
async function userController(req,res) {

 
    
}




module.exports = {
    registerController , loginController,userController
}


