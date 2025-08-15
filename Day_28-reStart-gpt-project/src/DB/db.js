
const mongoose  = require('mongoose')


async function  connectTodb(){

     
    await mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('Database Connected Sucessfully');
    })
    .catch((error)=>{
        console.log('Database Not connected');
    })
}


module.exports = connectTodb;
