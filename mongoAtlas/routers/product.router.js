const { Router } = require("express");
const { home, addProduct, addProductPage, viewProductPage } = require("../controllers/product.controller");

const productRoute = Router();


productRoute.get('/',home)
productRoute.get('/addProductPage',addProductPage)
productRoute.get('/viewProductPage',viewProductPage)
productRoute.post('/create',addProduct)



module.exports = productRoute