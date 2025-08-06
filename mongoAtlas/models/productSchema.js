const { default: mongoose } = require("mongoose");

let productSchema = new mongoose.Schema({
    p_name : {
        type : String,
        required : true,
    },
    p_price : {
        type : Number,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
},{
    timestamps:true,
})
const Product = mongoose.model("product",productSchema)
module.exports = Product;