const { Router } = require("express");
const { home, addProduct, addProductPage, viewProductPage, deleteProduct, editProductPage, editProduct, updateProduct } = require("../controllers/product.controller");

const productRoute = Router();


productRoute.get('/',home)
productRoute.get('/addProductPage',addProductPage)
productRoute.get('/viewProductPage',viewProductPage)
productRoute.get('/editProductPage',editProductPage)

productRoute.get('/delete/:id',deleteProduct)
productRoute.get('/edit/:id',editProduct)

productRoute.post('/create',addProduct)
productRoute.post('/update/:id',updateProduct)



module.exports = productRoute