
const mongoose = require('mongoose')


function connectToDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
         console.log('Database Is Connected ')
    })
    .catch((err)=>{
          console.log(err+'databse not connected ');
    })

}

module.exports = connectToDB