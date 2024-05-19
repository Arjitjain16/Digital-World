const mongoose = require('mongoose')
const plm = require("passport-local-mongoose")

const User = new mongoose.Schema({
    username : {
        type : String,
        require : true,
        minlength : 5,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password : String,

})

User.plugin(plm);

const user = mongoose.model("user",User)

module.exports = user
