
// *  apis ke andar hoga kya our kaise hoga APIs ki functionalily

const usersModel = require("../models/users.model")
const jwt = require("jsonwebtoken")



async function registerContoller(req,res){

    const  {username,passord} =req.body;

    const isUserAlreadyExist = await usersModel.findOne({
        username
    })





}

async function loginContoller(req,res){

    const  {username,passord} =req.body;

}

module.exports  = {
    registerContoller,
    loginContoller

}


