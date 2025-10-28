

const mongoose = require("mongoose")


function conectTodb(){
    
    mongoose.connect(process.env.MONGODB_URL) 
    .then(()=>{
        console.log("DB Connected")
    })
    .catch(()=>{
        console.log("DB not Connected")
    })
}

module.exports = conectTodb 