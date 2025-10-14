
const express = require("express")
const app = express()

app.use(express.json()) 

app.get('/',(req,res)=>{
    res.send(" Welcome to Server Home")
     
})
// post api 

const notes =[];

app.post('/notes',(req,res)=>{
    
       const {tittle ,content}= req.body

 console.log(tittle,content)

 notes.push(req.body)

 res.json({
    Massege:"Note Created Succesfully "
 })
})
 // show feature 
app.get('/notes',(req,res)=>{
    res.json(notes)
})
// delet featur 

app.delete('/notes/:index',(req,res)=>{

     const indexed = req.params.index;

     delete notes[indexed]

     res.json({

         Messagea:"Notes Deleted succesfully "

     })
     
})

// update features 

app.patch('/notes/:index',(req,res)=>{

    const indexd = req.params.index;

    const {tittle,content} = req.body;

    notes[indexd].tittle = tittle;
    notes[indexd].content = content;
    res.json(
        {
            Message:"note updated Succesfully"
            
        }
    )
    
})

app.listen(3000,()=>{

    console.log("Server is Runnig on Port http://localhost:3000")
})