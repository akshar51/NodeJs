const express = require('express');
const db = require('./config/emp');
const Employee = require('./models/empSchema');
const port = 5000;
const app = express()


app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/tables', (req, res) => {
    Employee.find()
    .then((emp)=>{
        res.render('pages/tables',{emp}); 
    })
    .catch((err)=>{
        console.log(err);
        res.render('pages/tables',{emp : []});
    })
});

app.get('/formBasic', (req, res) => {
    res.render('pages/formBasic');
});


app.get('/formWizard', (req, res) => {
    res.render('pages/formWizard',{emp : {}}); 
});

app.post('/emp/create',(req,res)=>{

    Employee.create(req.body)
    .then((emp)=>{
        res.redirect('/tables')
    })
    .catch((err)=>{
        console.log(err)
        res.redirect('/tables')
    })
})

// delete
app.get('/emp/delete/:id',(req,res)=>{
    const {id} = req.params;
    Employee.findByIdAndDelete(id)
    .then(()=>{
        res.redirect('/tables')
    })
    .catch((err)=>{
        console.log(err)
        res.redirect('/tables')
    })
})

//edit
app.get('/emp/edit/:id', (req, res) => {
    const {id} = req.params
    Employee.findById(id)
    .then((emp)=>{
        return res.render('pages/formWizard',{emp})
    })
    .catch((err)=>{
        console.log(err);
        return res.render('pages/formWizard',{emp : {} })
    })
});

app.post('/emp/update/:id',(req,res)=>{
    const {id} = req.params;
    Employee.findByIdAndUpdate(id,req.body)
    .then((emp)=>{
        console.log("Employee Updated..")
        res.redirect('/tables')
    })
    .catch((err)=>{
        console.log(err);
        res.redirect('/formWizard')
    })
})



app.listen(port,(err)=>{
    if(!err){
        console.log("Server Start");
        console.log("http://localhost:"+port)
    }
})