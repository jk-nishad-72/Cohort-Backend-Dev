
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


async function getLogincontroller(req,res){


   res.render('login')
}

async function postLogincontroller(req,res){

   const {email,password}= req.body;
    const user = await authModel.findOne({

        $or:[
         {email:email},
         {username:email}
        ]
       
    })

    if(!user){
      res.status(401).json({
         Message:"User not found or invvalid candidate"
      })

      
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password)


      if(!isPasswordMatch){
         res.status(401).json({
            Messae:"Invalid Password ❌"
         })
      }
      const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
      res.cookie('token',token)
      res.status(200).json({
         Message:"Login successfully 🎉",
         // User:user,
         // token:token
      })
   // res.json({
   //    message:"Login controller",
   //    email,
   //    password,
   // })

}







module.exports={

    getRegisterpage,
    postRegisterpage,
    getLogincontroller,
    postLogincontroller,

}

