const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/emp.controller");

router.get("/", employeeController.showForm);
router.post("/add", employeeController.addEmployee);
router.get("/employees", employeeController.getEmployees);
router.get("/edit/:id", employeeController.editEmployeeForm);
router.post("/update/:id", employeeController.updateEmployee);
router.get("/delete/:id", employeeController.deleteEmployee);

module.exports = router;