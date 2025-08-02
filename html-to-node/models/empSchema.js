const { default: mongoose } = require("mongoose");

const empSchema = new mongoose.Schema({
    empName : {
        type : String,
        required : true,
    },
    empId : {
        type : Number,
        required : true,
    },
    empEmail : {
        type : String,
        required : true,
    },
})

const Employee = mongoose.model('employee',empSchema)

module.exports = Employee