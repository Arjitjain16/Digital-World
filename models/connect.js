const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/digital")
.then(()=>console.log("connect to db"))
.catch((error)=>console.log(error))