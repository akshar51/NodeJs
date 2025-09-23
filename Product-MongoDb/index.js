const express = require('express')
const db = require('./config/db')
const app = express()
const port = 3000

app.set('view engine','ejs')
app.use(express.static('public'))

app.use('/',require('./routers'))

app.listen(port,(err)=>{
    if(!err){
        db()
        console.log('Server started')
        console.log('http://localhost:'+port)
    }
})