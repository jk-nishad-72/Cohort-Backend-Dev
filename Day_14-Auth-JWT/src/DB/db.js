

const mongoose = require('mongoose')


function connectedTodb(){


    mongoose.connect(process.env.MONGODB_URL )
    .then(()=>{
       
        console.log("Database connected ")
    })
    .catch(()=>{
       
        console.log("Database not  connected ")
    })
}

module.exports = connectedTodb