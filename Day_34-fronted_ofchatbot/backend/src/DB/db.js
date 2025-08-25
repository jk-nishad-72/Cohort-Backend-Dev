
const mongoose = require('mongoose')


async function  connectTodb() {


    await mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{

        console.log("Database connected sucesfully ")

    })
    .catch((error)=>{
        console.log("database Not connected ❌❌")
    })
}

module.exports = connectTodb