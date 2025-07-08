

 const mongoose = require("mongoose")

// here we create a schema and model for crud operation


// schema to define the data type of our data and structur

 const noteSchema = new mongoose.Schema({

    title:String,
    content:String,

 })

 // now we create a model 

 const noteModels = new mongoose.model("note",noteSchema)

 module.exports = noteModels




