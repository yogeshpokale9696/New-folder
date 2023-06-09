if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const transaction = require('./server_js/transactions')
const express = require('express')
const path = require('path')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')

const session = require('express-session')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
const methodOverride = require('method-override')
app.use(express.static(path.join(__dirname, 'src')));
const initializePassport = require('./passport-config')
const validate = require('./server_js/login_auth')
const register = require('./server_js/register')
var cookieParser = require("cookie-parser");

const flash = require('connect-flash')
app.use(flash());

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  key: "user_sid",
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
      maxAge: 1000 * 60 * 10
    }
   
}))


// Middleware to check session expiration
// app.use((req, res, next) => {
//   if (req.session && req.session.cookie && req.session.cookie.expires < new Date()) {
//     // The session has expired
//     req.session.destroy(); // Destroy the expired session
//   }
//   next();
// });

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkNotAuthenticated, (req, res) => {
  res.render('index.ejs')
})
app.get('/Dashboard', checkAuthenticated, (req, res) => {
  // console.log( "hello")
  res.render('acc-summary.ejs', { name:req.session.user.name})
})
app.get('/acc-summary', checkAuthenticated, (req, res) => {
  // console.log( "hello")
  res.render('acc-summary.ejs', { name:req.session.user.name})
})
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs',{success : ""})
})

app.post('/login',(req,res)=> {

  validate(req,res)
   
  

})

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs',{success : ""})
})

app.post('/register',(req, res) => {
  register(req,res)
})
app.get('/new-trans', checkAuthenticated,(req, res) => {
  res.render('new-transaction.ejs', { name:req.session.user.name,message:"Transaction successfully added" ,error : ""}) 
})
app.get('/new-tranf', checkAuthenticated,(req, res) => {
  res.render('new-transaction.ejs', { name:req.session.user.name,message:"",error:"Transaction failed"}) 
})

app.get('/new-transaction', checkAuthenticated,(req, res) => {
  res.render('new-transaction.ejs', { name:req.session.user.name,message:"",error:""}) 
})
app.post('/new-transaction',(req, res) => {
  if (req.body.check_BT == "on") {
    console.log('Blockchain transaction');

    transaction.tran_B(req,res) // Blockchain transaction

  } else {
    console.log('Simple transaction');

    transaction.tran(req,res) // Simple transaction
  }
  // res.send('Form submitted');
})

app.delete('/logout', (req, res) => {

  req.logout(function(err) {  // do this
      if (err) { return next(err); }
          res.redirect('/login')
  })// do this

})

function checkAuthenticated(req, res, next) {
  if (req.session.user) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.session.user) {
    return res.redirect('/Dashboard')
  }
  next()
}


// Check session where is it defined 

app.listen(3000, () => {
  console.log('Server listening on port 3000 visit localhost:3000');
});

// const Routes = require("./routes/index.js")

// app.use(Routes);
// module.exports = {
//   checkAuthenticated,
//   checkNotAuthenticated
// }