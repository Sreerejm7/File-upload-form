const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Form_database')
.then((result)=>{
  console.log("Database Connected Successfully...");
  
})

.catch((err=>{
  console.log("Error While Connecting To Database.");
  
}));

module.exports=mongoose