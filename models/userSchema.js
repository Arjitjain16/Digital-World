const moongose = require("mongoose")
const userSchema = new moongose.Schema({
    image : String,
    title : String,
    blog : String,
    description : String,
})



const blogModel = moongose.model("blog",userSchema)

module.exports = blogModel