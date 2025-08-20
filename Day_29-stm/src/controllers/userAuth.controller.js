
const express = require('express');
const authModel = require('../models/auth.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerController(req,res){

     const {fullname:{firstname,lastname}, email, password} = req.body;

     const UserExists = await authModel.findOne(
         
          { $or:[ 
                { email: email },
                { fullname: { firstname: firstname, lastname: lastname } }
          ]});


          if(UserExists){  
                      return res.status(409).json({ message: 'User already exists' });
          }

        //   console.log(firstname, lastname, email, password);    

           const hashedPassword = await bcrypt.hash(password, 10);  

          const newUser = await authModel.create({
               fullname: { firstname:firstname, lastname:lastname },
                email:email,
                password: hashedPassword, 
          });
          
          const token = jwt.sign({ id:newUser._id }, process.env.JWT_SECRET_KEY);

          res.cookie('token', token)

          res.status(201).json({
               message: 'User registered successfully',  
               user: newUser
          });
          


}

async function loginController(req, res) {


     const { email, password } = req.body;  

         const UserExists = await authModel.findOne({email:email})

         if(!UserExists){
            return res.status(409).json({
                Message:"user not found"
            })
         }

         const IsPasswordMath = await bcrypt.compare(password,UserExists.password)

         if(!IsPasswordMath){
            return res.status(409).json({
                Message:"Invalid Password ❌"
            })
         }


         const token = jwt.sign({id:UserExists._id},process.env.JWT_SECRET_KEY)

         res.cookie('token',token)
         
         res.status(200).json({
            Message:" Logged in successfully",
            user:UserExists
         })
    }

    
module.exports = { 
    registerController ,
    loginController
}; 