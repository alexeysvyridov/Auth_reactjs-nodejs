const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('./user');


const app = express();
mongoose.connect('mongodb+srv://alex:alex123@cluster0.3irbl.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},() => {
  console.log('Mongoose Is Connected');
})

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
  origin: 'http://localhost:3000', //client
  credentials: true
}));

app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport)
// end middleware


//routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if(err) throw err;
    if(!user) res.send("No user exists");

    else {
      req.logIn(user, err => {
        if(err) throw err;
        res.send("Successfuly Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});
app.post("/register", (req, res) => {
 User.findOne({username: req.body.username}, async (err,doc) => {
   if(err) throw err;
   if(doc) res.send("User already exist");
   if(!doc) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
     const newUser = new User({
       username: req.body.username,
       password: hashedPassword
     });
     await newUser.save();
     
     res.send("User Created");
   } 
 })
});
app.get("/user", (req, res) => {
  res.send(req.user)
});
//end routes

app.listen(4000, () => {
  console.log("Server listening");
});


