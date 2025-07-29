const express = require('express');
const db = require('./config/db');
const Books = require('./models/bookSchema');
const app = express();
const port = 3000;

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.render('addBooks')
})


app.post('/addBooks',(req,res)=>{
    
    let obj = {
        book_name : req.body.book_name,
        book_price : req.body.book_price,
    }

    Books.create(obj)
    .then(()=>{
        return res.redirect(req.get('Referrer') || '/')
    })
    .catch((err)=>{
        console.log(err);
        return res.redirect(req.get('Referrer')|| '/')
    })
})

 app.listen(port,(err)=>{
    if(!err){
        db;
        console.log("http://localhost:"+port)
    }
 })