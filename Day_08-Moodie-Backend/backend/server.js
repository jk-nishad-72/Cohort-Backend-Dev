
const app = require('./src/app')
require('dotenv').config();
const connetTodb = require('./src/DB/db')

connetTodb()

app.get("/",(req,res)=>{

    res.send("Welcome to server")

})

app.listen(3000,()=>{

    console.log("Srvr running at Port http://localhost:3000")

})