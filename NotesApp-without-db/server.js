
const express = require("express")

const connectToDb = require("./src/DB/db")

const noteModel = require("./src/models/note.model")


const cors = require("cors");





const app = express()
app.use(cors());

app.get('/',(req,res)=>{
    
    res.send("Welcome to Server Home 🙏")
})

app.use(express.json())

// create featur developed 

app.post("/notes",async (req,res)=>{

      const {tittle,content} = req.body
    await  noteModel.create({
        tittle:tittle,
        content:content
    })

      res.json({
        Message:"Note Added "

      })
     
})
// get featur 
app.get('/notes',async(req,res)=>{

       const note = await noteModel.find()

    res.json({
         
        Message:"notes",
        Notes:note
    })

})

// delet feature 

app.delete('/notes/:id',async(req,res)=>{

     const noteId = req.params.id
  
      await noteModel.findByIdAndDelete(
        noteId)
      res.json({

        Message:"Note deleted "

      })

})
// update featur 

app.patch("/notes/:id",async(req,res)=>{

    const noteId = req.params.id
    const {tittle,content} = req.body

    await noteModel.findByIdAndUpdate(noteId,{
        tittle:tittle,
        content:content
    })

    res.json({
        Message:"notes Updated"
        
    })
})


connectToDb()
app.listen(3000,()=>{

    console.log("Server runnig on Port http://localhost:3000")

})