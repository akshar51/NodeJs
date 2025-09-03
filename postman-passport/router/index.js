const { Router } = require("express");
const { signup } = require("../controllers/index.controller");

const router = Router()

router.post('/signup',signup)

module.exports = router
