
const app = require('./src/app')
const connectTodb = require('./src/DB/db')


connectTodb()
app.listen(3000,()=>{


    console.log("Server runnig at Port http://localhost:3000")

})
