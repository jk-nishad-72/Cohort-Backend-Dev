

const mongoose = require("mongoose")


function connectToDb(){


    mongoose.connect("mongodb+srv://jkn18869:jk%23nishad99@cohort.qtvx3nr.mongodb.net/?retryWrites=true&w=majority&appName=Cohort")
    .then(()=>{

        console.log("Congratulation Connected to db ")

    })
    .catch((err) => {
      console.log("❌ MongoDB Error", err);
    });
}

module.exports = connectToDb