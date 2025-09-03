const express = require('express');
const db = require('./config/db');
const app = express()
const port = 3000


app.use(express.json())
app.use('/',require('./router'))

app.listen(port,(err)=>{
    if(!err){
        db()
        console.log("Server started...")
        console.log("http://localhost:"+port)
    }
})