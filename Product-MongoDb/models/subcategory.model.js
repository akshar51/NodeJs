const { Schema, model, mongo, default: mongoose } = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
    }
})

const SubCategory = mongoose.model('sub-category',subCategorySchema)

module.exports = SubCategory