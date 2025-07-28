const express = require('express');
const port = 5000;
const app = express()

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/tables', (req, res) => {
    res.render('pages/tables'); 
});
app.get('/formBasic', (req, res) => {
    res.render('pages/formBasic'); 
});
app.get('/formWizard', (req, res) => {
    res.render('pages/formWizard'); 
});

app.listen(port,(err)=>{
    if(!err){
        console.log("Server Start");
        console.log("http://localhost:"+port)
    }
})