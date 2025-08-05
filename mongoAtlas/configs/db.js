const mongoose = require("mongoose");


mongoose.connect('mongodb+srv://aksharparekh401:12345@cluster0.ncwztql.mongodb.net/product')

let Product = mongoose.connection

module.exports = Product;


