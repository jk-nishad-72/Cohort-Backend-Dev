

const mongoose = require('mongoose');

async function connectDB() {

      await mongoose.connect(process.env.MOONGODB_URI)
      .then(()=>{
        console.log('Connected to MongoDB');
      }).catch(()=>{
        console.error('Error connecting to MongoDB');

      })
}

module.exports = connectDB;