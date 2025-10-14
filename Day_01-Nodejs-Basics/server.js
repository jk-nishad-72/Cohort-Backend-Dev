
const  catMe = require('cat-me')


console.log(catMe())

console.log('Hello world ')

const http = require('http')

const server = http.createServer((req,res)=>{

    res.end('Welcome to server ')

})

server.listen(3000,()=>{
    console.log('server running at port http://localhost:3000 ')


})

