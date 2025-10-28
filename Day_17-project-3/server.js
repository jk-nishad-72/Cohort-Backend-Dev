

const app = require('./src/app')

const conectTodb = require('./src/DB/db')



conectTodb()
app.listen(3000,()=>{

    console.log("SErver in running on post 3000")
})
