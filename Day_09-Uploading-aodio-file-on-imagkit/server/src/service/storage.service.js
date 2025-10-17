
require('dotenv').config()

var ImageKit = require("imagekit");


var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey :process.env.IMAGEKIT_PRIVATE_KEY, 
    urlEndpoint : process.env.URL_ENDPOINT
});


function uploadSongFile(file){
    return new Promise((resolve,reject)=>{
         imagekit.upload({
             file:file.buffer,
             fileName:'hello-cohort-jk-prac'
         },(error,result)=>{

         if(error){
            reject(error)
         }
         else {
            resolve(result)
         }
    })

  })


}

module.exports= uploadSongFile