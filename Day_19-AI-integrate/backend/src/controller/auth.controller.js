const d19authPrcModel = require("../models/auth.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


async function registerController(req, res) {
  const { username, email, password } = req.body;

  const IsUsernameExist = await d19authPrcModel.findOne({ username });

  if (IsUsernameExist) {
    res.status(401).json({
      Msg: "User Name alreaddy Exists  ",
    });
  }

  const newUser = await d19authPrcModel.create({
    username: username,
    email: email,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    Msg: " Register succesFully 🎉 ",
    user: newUser,
  });
}

async function loginController(req, res) {

     const {email,password } = req.body;

       const IsUserExist = await d19authPrcModel.findOne({email})

       if(!IsUserExist){

         res.status(401).json({
          Message:" User can't be find "
         })
       }

       const isMatchPassword = await bcrypt.compare(password,IsUserExist.password)

       if(!isMatchPassword){ 
         
         res.status(401).json({
          Message:"Incorrect Password "

         })
       }

       const token = jwt.sign({id:IsUserExist._id},process.env.JWT_SECRET)

       res.cookie('token',token)

       res.status(200).json({
        Message:" Login Successfully 🎉 "
       })

     
}


async function userController(req, res) {

   const token = req.cookies.token;

   if(!token){
     res.status(401).json({
      Message:" Unautherised  Access "
     })
   }

   try{

    const decode = jwt.verify(token,process.env.JWT_SECRET)

    const userDetails = await d19authPrcModel.findById(decode.id);

    if(!userDetails){
      res.status(401).json({
        Message:" User can't be find "
      })
    }
    res.status(200).json({
      Message:" User Profile 🙅‍♀️ ",
      User:userDetails
    })

   }catch(error){ 
      res.status(401).json({
        Message:" User can't be find " + error
      })
    
   }
   
}

async function logoutController(req, res) {

     res.clearCookie('token')

     res.status(200).json({
      Message:" Logout SuccessFully 🎉 "
     })
}  

module.exports = {
  registerController,
  loginController,
  userController,
  logoutController,
};
