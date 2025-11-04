
const mongoose = require('mongoose')

function connectTodb(){

     mongoose.connect(process.env.MONGODB_URL)
     .then(()=>{
         console.log('Database Sucessfully Connected ✅ ')
     })
     .catch((error)=>{
        console.log('Database Not Connected ❌  '+error)
     })
} 
module.exports = connectTodb