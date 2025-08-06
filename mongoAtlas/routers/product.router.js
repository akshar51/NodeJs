const { Router } = require("express");
const { home, addProduct } = require("../controllers/product.controller");

const productRoute = Router();


productRoute.get('/',home)
productRoute.post('/',addProduct)



module.exports = productRoute