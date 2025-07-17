
const express = require("express")

const app = express()

app.get('/',(req,res)=>{

    res.send("Welcome to server")

})

app.get('/about',(req,res)=>{

    res.send("Welcome to aboute page ")
    
})



app.listen(3000,()=>{

    console.log("server is running at 3000");

    
})