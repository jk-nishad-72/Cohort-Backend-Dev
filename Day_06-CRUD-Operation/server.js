

 
 const express = require("express")
 const connectTodb  = require("./src/DB/db")

 const noteModels =require("./src/models/note.model")


 const app =  express()

 app.use(express.json())

    //create an rest api 
     app.get('/',(req,res)=>{

           res.send("Server Home Page 🙏✌️")
     })

     //create a POST API 
     app.post('/notes',async(req,res)=>{

        const {title,content} = req.body

       await noteModels.create({

             title:title,
             content:content

        })
        res.json({

             Message:"Note Created SuccesFully "

        })

         
     })

     // now show use GET API METHOD 

     app.get('/notes',async(req,res)=>{

        const notes = await noteModels.find();
         
        res.json({

            Messege:"See all notes",
            notes

        })

     })


     // now delet data from db using delete API METHOD

     app.delete('/notes/:id',async(req,res)=>{
         
         const noteId =  req.params.id;

         await noteModels.findByIdAndDelete(noteId)
         res.json({
             Message:"Notes deleted sccesfully",

         })
     })

     //now time for update featur using PATCH API method

     app.patch('/notes/:id',async(req,res)=>{

         const noteId = req.params.id
           const {title,content} = req.body;

           await noteModels.findByIdAndUpdate(noteId,{
             title:title,
             content:content,
           })

           res.json({
            Message:"notes Updated successfully"

           })
         
         
     })



     connectTodb()
    app.listen(3000,()=>{
          
        console.log("Server is Running on Port http://locaclhost:3000")

    })

 