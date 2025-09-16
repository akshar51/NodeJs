const { Router } = require("express");
const { homePage,loginPage,signupPage,signup, logout, changePassPage, changePass, emailConfirmPage, verifyOtpPage, verifyOtp, verifyPage, newPassPage, emailConfirm, verify, newPass } = require("../controllers");
const passport = require("passport");

const router = Router()

router.get('/',passport.userAuth,homePage)
router.get('/login',loginPage)
router.get('/signup',signupPage)


router.get('/verifyOtp',verifyOtpPage)
router.post('/verifyOtp',verifyOtp)


router.post('/signup',signup)
router.post('/login',passport.authenticate('local',{successRedirect:'/',failureRedirect:'/login'}))


router.get('/emailConfirm',emailConfirmPage)
router.post('/emailConfirm',emailConfirm)

router.get('/verify',verifyPage)
router.post('/verify',verify)

router.get('/newPass',newPassPage)
router.post('/newPass',newPass)


router.get('/logout',logout)

router.get('/changePass',passport.userAuth,changePassPage)
router.post('/changePass/:id',passport.userAuth,changePass)

module.exports = router