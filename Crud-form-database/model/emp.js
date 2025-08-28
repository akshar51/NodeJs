const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String },
  gender: { type: String, enum: ["male", "female"] },
  hobbies: [{ type: String }],
  department: { type: String, enum: ["HR", "IT", "Sales", "Finance"] }
});

module.exports = mongoose.model("Employee", employeeSchema);