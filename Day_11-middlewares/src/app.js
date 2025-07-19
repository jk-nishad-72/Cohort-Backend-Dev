

const express = require("express")
const indexRouter = require('../src/routes/index.routes')
const app = express();


app.use((req,res,next)=>{
    console.log("App or router ke bich ka middlewar")
    next();
})

app.use('/',indexRouter)


module.exports = app