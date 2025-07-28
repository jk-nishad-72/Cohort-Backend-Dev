

const mongoose = require('mongoose')


function connectTodb(){

    mongoose.connect(process.env.MONGDB_URL)
    .then(()=>{

        console.log("database connected ")

    })
    .catch(()=>{

        console.log("database  not connected ")

    })

}

module.exports = connectTodb

