const express = require('express');
const port = 5000;
const app = express();
let users = [];


app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

// Fetch
app.get('/',function(req,res){
    res.render('index',{users})
})


// Create
app.post('/',function(req,res){

    let obj = {
        email : req.body.email,
        password : req.body.password,
        id : Date.now()
    }
    users.push(obj)
    res.redirect(req.get('Referrer') ||'/')
    
})


// Delete
app.get('/users/delete/:id',(req,res)=>{
    let {id} = req.params
    users = users.filter(val => val.id != id);
    res.redirect(req.get('Referrer') ||'/')
})

app.listen(port,function(err){
    if(err){
        console.log(err)
    }else{
        console.log("Server started..")
        console.log("http://localhost:"+port)
    }
})