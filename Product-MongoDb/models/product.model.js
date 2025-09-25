const { Schema, model, mongo, default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:String,
    image :{ type: String, default: null } ,
})

const Product = mongoose.model('product',productSchema)

module.exports = Product