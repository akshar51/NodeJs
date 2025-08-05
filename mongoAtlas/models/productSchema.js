const { default: mongoose } = require("mongoose");

let productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    price : {
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
    image : {
        type : String,
        required : true,
    },
})

module.exports = mongoose.model("product",productSchema);