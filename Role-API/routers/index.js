const { Router } = require("express");
const adminCtl = require('../controller');
const router = Router();

router.get('/',adminCtl.homePage);
router.get('/form-basic',adminCtl.formBasicPage)
router.get('/authentication-login',adminCtl.LoginPage)
router.get('/authentication-register',adminCtl.RegisterPage)


module.exports = router;