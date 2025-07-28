

const mongoose = require('mongoose')


const usrauthSchema  = new mongoose.Schema({
     
     username:{
          type:String,
          unique:true,
          required:true
     },

     password:{
          type:String,
     }

})


const userauthModel = new mongoose.model('userauth',usrauthSchema)


module.exports = userauthModel