


async function  registerController(req,res) {

       
      res.status(200).json({
        Message: req.body 
      })


    
}

module.exports = {
    registerController,
}