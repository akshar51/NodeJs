const { Router } = require("express");
const adminClt = require('../controllers');
const imageUpload = require("../middleware/imageUpload");

const router = Router()

router.get('/',adminClt.homePage)
router.get('/table',adminClt.tablePage)
router.get('/form-basic',adminClt.formBasicPage)
router.post('/form-basic',imageUpload,adminClt.formBasic)

module.exports = router