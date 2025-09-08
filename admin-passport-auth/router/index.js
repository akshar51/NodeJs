const { Router } = require("express");
const { homePage,loginPage,signupPage,signup, logout } = require("../controllers");
const passport = require("passport");

const router = Router()

router.get('/',passport.userAuth,homePage)
router.get('/login',loginPage)
router.get('/signup',signupPage)

router.post('/signup',signup)
router.post('/login',passport.authenticate('local',{successRedirect:'/',failureRedirect:'/login'}))

router.get('/logout',logout)

module.exports = router