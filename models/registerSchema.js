const mongoose = require('mongoose')
const plm = require("passport-local-mongoose")

const User = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        
    }
})
