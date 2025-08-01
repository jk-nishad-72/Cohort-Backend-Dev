
const mongoose = require('mongoose')
const { mkcol } = require('../app')


function connectedTodb(){


    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('DataBase connected ')
    })
    .catch((error)=>{
        console.log("Database not connected")
    })
}

module.exports = connectedTodb