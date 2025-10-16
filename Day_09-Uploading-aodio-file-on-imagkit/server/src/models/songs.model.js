
const mongoose = require('mongoose')

const songD9PrcSchema = mongoose.Schema({

      SongName:String,
      ArtistName:String,
      audio:String,
      mood:String

})



const songD9PrcModel  = mongoose.model('songD9PrcModel',songD9PrcSchema)


module.exports = songD9PrcModel

