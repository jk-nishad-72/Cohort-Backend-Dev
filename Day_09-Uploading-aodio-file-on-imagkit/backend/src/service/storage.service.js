

require('dotenv').config();


// console.log('ImageKit Public Key:', process.env.IMAGEKIT_PUBLIC_KEY);

var ImageKit = require("imagekit");


var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey :process.env.IMAGEKIT_PRIVATE_KEY, 
    urlEndpoint : process.env.URL_ENDPOINT
});

function uploadFile(file){
    return new Promise((resolve,reject)=>{
         imagekit.upload({

            file:file.buffer,
            fileName:"hello-cohort"

         },(error,result)=>{
            if(error){
                reject(error);
            }else{
                resolve(result);
            }

         })
        
    });
}


module.exports = uploadFile