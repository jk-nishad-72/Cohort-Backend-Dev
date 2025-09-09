
const express = require('express')
const app = express()




app.set("view engine","ejs");


app.post("/api/auth/register",(req,res)=>{

     res.status(200).send({
        Message:'user registered successfully'
     })
})

app.get('/',(req,res)=>{

    res.render("index",{message:"hello from ejs "})
    
})


module.exports = app
