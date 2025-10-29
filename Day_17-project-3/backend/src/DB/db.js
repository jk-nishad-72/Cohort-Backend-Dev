
const mongoose = require('mongoose')

function connectToDB(){

     mongoose.connect(process.env.MONGODB_URL) 
        .then(() => {
            console.log('Database succesfully connected ');
            
            
        }).catch((err) => {
            console.log('Database Not connected '+ err);
        
        });
     
}

module.exports = connectToDB