
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

     username:{
/* sabhi ka user ka username unique hoga */
        type:String,
        unique:true,  
        required:true
     },
     password:{
        type:String
     }

})

const userModel = mongoose.model("userAuth",userSchema)


module.exports = userModel