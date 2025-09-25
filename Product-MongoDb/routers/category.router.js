const { Router } = require("express");
const categoryCtl = require('../controllers/category.controller')
const catRouter = Router()

catRouter.get('/add-category',categoryCtl.addCategory)
catRouter.get('/view-category',categoryCtl.viewData)

catRouter.post('/add-category',categoryCtl.addCategoryData)
catRouter.get('/delete/:id',categoryCtl.deleteCategory)

module.exports = catRouter