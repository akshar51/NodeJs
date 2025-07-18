const fs = require('fs')
const express = require('express')
const app = express()
const port = 8081


app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/contact',(req,res)=>{
    res.render('contact')
})

app.listen(port,(err)=>{
    if(err){
        console.log(err.message)
    }
    else{
        console.log(`Server start on port :${port}`)
    }
})