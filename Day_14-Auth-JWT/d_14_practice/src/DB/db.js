
const mongoose = require('mongoose')

function connectedToDB(){
     mongoose.connect(process.env.MONGODB_URL )
     .then(()=>{

         console.log("Database Connected succesFully 🎉 ");
     })
     .catch((error)=>{
        console.log('Database Not connected ' + error);
        
     })
}

module.exports = connectedToDB

