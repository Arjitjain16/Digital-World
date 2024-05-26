var express = require('express');
var router = express.Router();
const User = require("../models/userSchema")
const upload = require("../Utils/multer").single('image')
const passport = require("passport")
const LocalStategy = require("passport-local")
const registerUser = require("../models/registerSchema")

passport.use(new LocalStategy(registerUser.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
})

// blog creat
router.get('/blog', function(req, res, next) {
  res.render('blog');
});
router.post('/blog', upload, async function(req, res, next) {
  try {
    const newBlogs = new User({ ...req.body, image: req.file.filename})
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
    res.render("update", {update : updateBlog} )
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

//---- passport operation -----------------------------------------
// register

router.get('/register', function(req, res, next) {
  res.render('register',{user : req.user});
});
router.post('/register-user',async function(req, res, next) {
  try {
    const {username, email, password} = req.body
    await registerUser.register({username,email}, password)
    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
});

//login
router.get('/login', function(req, res, next) {
  res.render('login',{user : req.user});
});
router.post('/login-user',passport.authenticate("local", 
  {
    successRedirect :"/profile",
    failureRedirect : "/login"
  }),
  function(req,res,next){}
);

//logout

router.get('/logout:id', isloggedIn, function(req, res, next) {
  req.logout(()=>{
    res.render("/login")
  });
});



router.get('/profile', isloggedIn, function(req, res, next) {
  res.render('profile' , {user : req.user});
});

// mail verify

router.get('/forget-email', function(req, res, next) {
  res.render('Userforgetemail' ,{user : req.user});
});

router.post('/forget-email', async function(req, res, next) {
  try {
    const user = await registerUser.findOne({email : req.body.email})
    if(user){
      res.redirect(`/forget-password/${user._id}`)
    }else{
      res.redirect('/forget-email')
    }
  } catch (error) {
    console.log(error);
  }
});

// forget password

router.get('/forget-password/:id', function(req, res, next) {
  res.render('Userforgetpassword', {user : req.user , id:req.params.id});
});

router.post('/forget-password/:id', async function(req, res, next) {
 try {
  const user = await registerUser.findById(req.params.id)
  await user.setPassword(req.body)
  await user.save()
  redirect("/login")
 
 } catch (error) {
  console.log(error);
 }
});

router.get('/contact', function(req, res, next) {
  res.render('contact' ,{user : req.user});
});

function isloggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next()
  }else{
    res.redirect("/login")
  }
}

module.exports = router;
