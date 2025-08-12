
const authModel = require('../models/auths.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




async function getRegisterpage(req,res){

     res.render('register')


}

async function postRegisterpage(req,res){

     const {email,username,password} = req.body;

        // console.log(email,username,password)
       const UserExists = await authModel.findOne({
         $or:[
            {email:email},
            {username:username}
         ]
       })

       if(UserExists){
         res.status(401).json({
            Message:"user already exists"
         })
       }

    const hasspassword = await bcrypt.hash(password,10)

       const newUser = await authModel.create({
        email:email,
        username:username,
        password:hasspassword,
       })

       const token = jwt.sign({
        id:newUser._id},process.env.JWT_SECRET_KEY
       )

       res.cookie('token',token,)

       res.status(201).json({
        Message:"Registration successfully 🎉",
        User:newUser,
       })
}






module.exports={

    getRegisterpage,
    postRegisterpage

}

