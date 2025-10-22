
const app = require('./app')
const connectedToDB = require('./src/DB/db')
const authRouter = require('./src/routes/auth.routes')







connectedToDB() 

app.use('/api/auth',authRouter)

app.get('/',(req,res)=>{
     
    res.json({
        message:"Welcome to Server  🙅‍♀️☑️ "
    })
})





app.listen(3000,()=>{
     
    console.log("Server running at Port http://localhost:3000 ");

    
})