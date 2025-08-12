
const mongoose = require('mongoose')

function connectTodb(){


    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{

        console.log("Db connected")
        

    })
    .catch((error)=>{
        console.log("Db not  connected")

    })
}

module.exports = connectTodb