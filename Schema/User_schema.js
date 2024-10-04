const mongoose= require('mongoose')

const format = mongoose.model('form',{
  Name:{
    type:String,
    require:true
  },
  Branch:{
    type:String,
    require:true
  },
  Photo:{
    type:String,
    require:true
  },
  Proof:{
    type:String,
    require:true
  }
})

module.exports=format
