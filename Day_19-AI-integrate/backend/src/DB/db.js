
const mongoose = require("mongoose")


function connectedToDB(){

    mongoose.connect(process.env.MONGODB_URL)
   .then(()=>{
        console.log('DataBase Connected Succesfully ✅ ');
        
    }) .catch((errore)=>{
        console.log("DataBase Not Connected " + errore);
        
    }) 

     
}

module.exports = connectedToDB