
const mongoose = require('mongoose')



function connectTodb(){

     mongoose.connect(process.env.MONGODB_URL)
     .then(()=>{
         console.log('Database connected ');
         
     })
     .catch((err)=>{
        console.log(err+"Database Not connected ");
     })
}


module.exports = connectTodb