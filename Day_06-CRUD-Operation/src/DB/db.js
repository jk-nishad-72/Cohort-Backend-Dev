

const mongoose = require("mongoose")


 function connectTodb(){

     
    mongoose.connect("mongodb+srv://jkn18869:jk%23nishad99@cohort.qtvx3nr.mongodb.net/?retryWrites=true&w=majority&appName=Cohort")
    .then(
        console.log("connected to db")
    )
 }

 module.exports = connectTodb
