const express = require('express');
const { addProductPage } = require('./controllers/product.controller');
const app = express();
const port = 3000;

app.set('view engine','ejs');

app.use('/',addProductPage)

app.listen(port,(err)=>{
    if(!err){
        console.log("Server started..");
        console.log("http://localhost:"+port);
    }
})