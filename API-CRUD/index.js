const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express()
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api',require('./router/index'))


app.listen(port,(err)=>{
    db()
    if(!err){
        console.log("Server started...")
        console.log("http://localhost:"+port)
    }
})