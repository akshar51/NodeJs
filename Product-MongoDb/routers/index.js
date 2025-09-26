const { Router } = require("express");
const imageUpload = require("../middleware/imageUpload");
const adminClt = require('../controllers');
const catRouter = require("./category.router");

const router = Router()

router.get('/',adminClt.homePage)
router.get('/table',adminClt.tablePage)
router.get('/form-basic',adminClt.formBasicPage)
router.get('/delete/:id',adminClt.deleteProduct)
router.get('/edit',adminClt.editPage)
router.get('/edit/:id',adminClt.editProduct)


router.post('/form-basic',imageUpload,adminClt.formBasic)
router.post('/update/:id',adminClt.updateProduct)

router.use('/category',require('./category.router'))
router.use('/subcategory',require('./subCategory.route'))

module.exports = router