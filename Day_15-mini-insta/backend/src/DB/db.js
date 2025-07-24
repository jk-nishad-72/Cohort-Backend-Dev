

const mongoose = require('mongoose')


function connectTodb(){


    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("connected to db")
    })
    .catch(()=>{
        console.log("not connected to db")
    })
}

module.exports = connectTodb