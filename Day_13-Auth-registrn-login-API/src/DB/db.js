
const mongoose = require("mongoose")



function connetTodb(){


    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Connted to DB")
    })
    .catch(()=>{
        console.log("Not connted ")

    })
    
}

module.exports = connetTodb
