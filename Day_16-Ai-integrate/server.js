
const app = require('./src/app')
const connectTodb = require('./src/DB/db')




connectTodb()
app.listen(3000,()=>{

    console.log("Server running at port 3000")

})