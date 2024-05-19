var express = require('express');
var router = express.Router();
const User = require("../models/userSchema")
const upload = require("../Utils/multer")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',);
})

// blog creat
router.get('/blog', function(req, res, next) {
  res.render('blog');
});
router.post('/blog', upload.single('image'), async function(req, res, next) {
  try {
    const newBlogs = new User(req.body)
    await newBlogs.save()
    res.redirect("/readall")
  } catch (error) {
    console.log(error);
  }
});

router.get('/readall', async function(req, res, next) {
  try {
    const readify = await User.find()
    res.render("readify", {readify : readify})
  } catch (error) {
    console.log(error);
  }
});

//delete
router.get('/delete/:id', async function(req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.redirect("/readall")
  } catch (error) {
    console.log(error);
  };
});

//update
router.get('/update/:id', async function(req, res, next) {
  try {
    const updateBlog = await User.findById(req.params.id)
    res.render("update", {update : updateBlog})
  } catch (error) {
    console.log(error);
  }
});

router.post('/update/:id', async function(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/readall")
  } catch (error) {
    console.log(error);
  }
});

// register

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

module.exports = router;