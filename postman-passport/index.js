const express = require('express');
const db = require('./config/db');
const port = 3000
const app = express()


app.use(express.json())
app.use('/',require('./router/index'))

app.listen(port,(err)=>{
    if(!err){
        db()
        console.log("Server started...")
        console.log("http://localhost:"+port)
    }
})