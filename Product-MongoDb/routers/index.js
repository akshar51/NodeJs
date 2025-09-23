const { Router } = require("express");
const adminClt = require('../controllers')

const router = Router()

router.get('/',adminClt.homePage)
router.get('/table',adminClt.tablePage)
router.get('/form-wizard',adminClt.formWizardPage)
router.get('/form-basic',adminClt.formBasicPage)

module.exports = router