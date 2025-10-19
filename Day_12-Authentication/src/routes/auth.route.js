
const  express = require('express')

const authRouter = express.Router();




 


authRouter.get('/',(req,res)=>{
    res.json({
         Message:" Welcome to  👋 Server "
    })
})

authRouter.post('/register',(req,res)=>{

     
    const userdata = req.body;
         res.status(201).json({
            message:"message recieved ",
            user: userdata
         })

})

authRouter.post('/login',(req,res)=>{

       const userdata = req.body;

       res.status(200).json({
        message:" login succesfully ",
        user:userdata
       })

       

})



module.exports = authRouter