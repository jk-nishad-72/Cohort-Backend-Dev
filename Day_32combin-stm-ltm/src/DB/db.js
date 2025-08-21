

const mongoose = require('mongoose')


async function connecTodb(){
 
     await mongoose.connect(process.env.MONGODB_URI)
     .then(()=>{
          console.log("Mongodb connected  sucessfully ✅")
     })
     .catch((error)=>{
         
           console.log("Database not connected ❌")
     })

}


module.exports = connecTodb