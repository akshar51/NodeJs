const { default: mongoose } = require("mongoose");

const bookSchema = new mongoose.Schema({
    book_name : {
        type : String,
        required : true,
    },
    book_price : {
        type : Number,
        required : true,
    }    
})

const Books = mongoose.model('BooksTbl',bookSchema)

module.exports = Books;
