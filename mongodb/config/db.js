const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/Books');
const db = mongoose.connection

db.once('open',(err)=>{
    if(err){
        console.log('Database not connected');
        console.log(err.message)
        return false;
    }
    console.log("Database connected...")
})

module.exports = db;

