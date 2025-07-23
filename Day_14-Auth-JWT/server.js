
const app = require("./src/app")



app.get('/',(req,res)=>{
    res.send("Welcome to server")
})

app.listen(3000,()=>{

    console.log("SErver running at port http://localhost:3000");

    
})