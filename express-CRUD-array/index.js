const express = require('express');
const port = 5000;
const app = express();
const users = [];


app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))


app.get('/',function(req,res){
    res.render('index')
})

app.post('/signup',function(req,res){

    let obj = {
        email : req.body.email,
        password : req.body.password
    }
    users.push(obj)
    res.redirect('/')
})



app.listen(port,function(err){
    if(err){
        console.log(err)
    }else{
        console.log("Server started..")
        console.log("http://localhost:"+port)
    }
})