const app = require("./src/app");
require('dotenv').config();

const connectToDB = require('./src/DB/db');



connectToDB();

app.get('/',(req,res)=>{

    res.send("Welcome to the Server ")

})



app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");

});





