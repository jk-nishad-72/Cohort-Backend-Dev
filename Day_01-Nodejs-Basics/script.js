const catMe = require("cat-me")

  console.log(catMe())
console.log("Hello world ")



const http = require('http')

const server  = http.createServer((req,res)=>{

      res.end(" server  page")

})

server.listen(3000,()=>{
    console.log("server is running at port http://localhost:3000")

    
})
