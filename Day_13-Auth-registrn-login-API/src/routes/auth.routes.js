const express = require("express");

const userModel = require("../models/user.model");

const router = express.Router();



router.post('/register',async(req,res)=>{

    const {username,password} = req.body;

    const newUser = await userModel.create({
        username,
        password
    })

    res.status(201).json({
        Message:"Welcome the auth page ",
        newUser:newUser,
    })
})

router.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const isuserExist = await userModel.findOne({
        username:username,
    });
    if(!isuserExist){
        return res.status(401).json({Message:"User not found"});
    }
    
    const isPasswordCorrect = password === isuserExist.password;

    if(!isPasswordCorrect){
        return res.status(401).json({Message:"Invalid password"});
    }

    res.status(200).json({
        Message:"Login successful",
    })
})


router.get('/user',(req,res)=>{

    res.json({

        Message:"Welcome the user page "

    })



})
module.exports = router;
