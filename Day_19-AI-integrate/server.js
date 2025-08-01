
 const app = require('./src/app')
 const connectedTodb = require('./src/DB/db')




connectedTodb()
 app.listen(3000,()=>{

    console.log("server running at port 3000")
 })
