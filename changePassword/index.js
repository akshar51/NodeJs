const bodyParser = require('body-parser')
const express = require('express')
const db = require('./config/db')
const LocalStrategy = require('./middleware/passport')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash');
const app = express()
const port = 3000


app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))



app.use(session({
    secret:'user',
    resave:false,
    saveUninitialized:false,
    cookie : {maxAge: 1000*60*60}
}));
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.flashMessage)

app.use('/',require('./router'))

;
app.listen(port,(err)=>{
    if(!err){
        db()
        console.log("Server started...")
        console.log(`http://localhost:${port}`)
    }
})