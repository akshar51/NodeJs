const { Router } = require("express");
const { homePage ,signupPage,loginPage, signup, login} = require("../controller/blog.controller");

const router = Router()

router.get('/',homePage)
router.get('/signup',signupPage)
router.get('/login',loginPage)

router.post('/signup',signup)
router.post('/login',login)

module.exports = router
