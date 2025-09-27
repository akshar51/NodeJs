const { Router } = require("express");
const subCatCtl = require('../controllers/subCategory.controller')
const subCatRouter = Router()

subCatRouter.get('/create',subCatCtl.create)
subCatRouter.get('/view',subCatCtl.view)
subCatRouter.get('/delete/:id',subCatCtl.delete)
subCatRouter.get('/edit/:id',subCatCtl.editSubCategory)

subCatRouter.post('/create',subCatCtl.createData)
subCatRouter.post('/update/:id',subCatCtl.updateSubCategory)


module.exports = subCatRouter
