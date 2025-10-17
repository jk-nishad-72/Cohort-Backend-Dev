
const app = require('./app')
const connectToDB = require('./src/DB/db')




connectToDB()
app.listen(3000,()=>{
     console.log("Server is runnig at port 3000 ");
})