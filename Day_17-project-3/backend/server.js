
const app = require('./app')
const connectToDB = require('./src/DB/db')



 connectToDB()
app.get('/',(req,res)=>{

     res.json({
        message:" welcome to server 🙏 "
     })
})

app.listen(3000,()=>{ 

    console.log("Server running at port http://localhost:3000");
    
})