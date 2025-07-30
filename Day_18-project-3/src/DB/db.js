
const mongoose = require('mongoose')



function connectTodb(){

    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database Connected")
    })
    .catch((error)=>{

        console.log("Database not  Connected")
    })
}

module.exports= connectTodb