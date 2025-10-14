
const express = require('express')

const app  = express();

app.get('/',(req,res)=>{

     res.send('welecome  Server 🎉 ')
})





app.listen(3000,function(){
     
     console.log('server runnig at port http://localhost:3000 ')

})