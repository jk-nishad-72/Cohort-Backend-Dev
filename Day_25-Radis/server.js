

const app = require('./src/app')
const connectTodb = require('./src/DB/db')


connectTodb()
app.listen(3000,()=>{
    console.log("server running at 3000")
})

