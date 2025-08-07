const express = require('express');
const { addProductPage } = require('./controllers/product.controller');
const  db  = require('./configs/db');
const app = express();
const port = 3000;

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))
app.use(express.static('assets'))

app.use('/',require('./routers/product.router'))

app.listen(port,async (err)=>{
    if(!err){
        await db();
        console.log("Server started..");
        console.log("http://localhost:"+port);
    }
})