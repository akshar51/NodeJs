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

module.exports.addProductPage =async (req,res)=>{
    return res.render('pages/addProductPage')
}

module.exports.viewProductPage =async (req,res)=>{
    try {
        let product = await Product.find({})
        return res.render('pages/viewProductPage',{product})
    } catch (error) {
        console.log(error)
        return res.render('pages/viewProductPage',{product : []})
    }
}

module.exports.deleteProduct = async (req,res)=>{
    try {
        let {id} = req.params
        await Product.findByIdAndDelete(id);
        res.redirect(req.get("Referrer" || "/"))
    } catch (error) {
        console.log(error)
        res.redirect(req.get("Referrer" || "/"))
    }
}