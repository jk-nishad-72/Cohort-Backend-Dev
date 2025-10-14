const connectTodb = require('./src/db/db')
const express = require("express")

const app = express();


connectTodb()

app.get('/',(req,res)=>{
    res.send("Server Home Page")

})

app.listen(3000,()=>{

    console.log("Server run o Port http://localhost:3000")

})