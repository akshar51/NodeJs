const { Router } = require("express");
const categoryCtl = require('../controllers/category.controller')
const catRouter = Router()

catRouter.get('/add-category',categoryCtl.addCategory)
catRouter.get('/view-category',categoryCtl.viewData)
catRouter.get('/delete/:id',categoryCtl.deleteCategory)
catRouter.get('/edit/:id',categoryCtl.editCategory)

catRouter.post('/add-category',categoryCtl.addCategoryData)
catRouter.post('/update/:id',categoryCtl.updateCategory)

module.exports = catRouter