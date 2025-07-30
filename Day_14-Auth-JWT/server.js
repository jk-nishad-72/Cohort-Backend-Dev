
const app = require("./src/app")

const connectedTodb = require('./src/DB/db')


connectedTodb()



app.listen(3000,()=>{

    console.log("SErver running at port http://localhost:3000");

    
})