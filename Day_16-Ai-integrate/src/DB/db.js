

const mongoose = require('mongoose')


function connectTodb(){

    mongoose.connect(process.env.MONGODB_URL) 
    .then(()=>{

        console.log("database connected ")

    })
    .catch((error)=>{

        console.log("database  not connected ")

    })

}

module.exports = connectTodb

