const Product = require("../models/productSchema")

module.exports.home = (req,res)=>{
    res.render('index')
}

module.exports.addProduct = async (req,res)=>{
    try{
        await Product.create(req.body)
        res.redirect(req.get('Referrer') || '/')
    }
    catch(err){
        console.log(err)
        res.redirect(req.get('Referrer') || '/')
    }
}

module.exports.addProductPage = (req,res)=>{
    return res.render('pages/addProductPage')
}

module.exports.viewProductPage = (req,res)=>{
    return res.render('pages/viewProductPage')
}