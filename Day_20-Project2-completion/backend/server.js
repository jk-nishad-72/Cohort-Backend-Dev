
const app = require('./app')
const connectTodb  =require('./src/DB/db')


connectTodb()

app.get('/',(req,res)=>{

      res.send('Welcome to Server 🙏 ')

})

app.listen(3000,()=>{
     console.log('Server running at Port http://localhost:3000');
})