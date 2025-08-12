const Product = require("../models/productSchema")
const fs = require('fs');


module.exports.home = (req,res)=>{
    res.render('index')
}

module.exports.addProduct = async (req,res)=>{
    try{
        let image = req.file.path;
        await Product.create({...req.body,image})
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

module.exports.editProductPage =async (req,res)=>{
    return res.render('pages/editProductPage')
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
        let product = await Product.findByIdAndDelete(id);
        fs.unlinkSync(product.image)
        res.redirect(req.get("Referrer" || "/"))
    } catch (error) {
        console.log(error)
        res.redirect(req.get("Referrer" || "/"))
    }
}

module.exports.editProduct = async (req,res)=>{
    try {
        let {id} = req.params;
        let product = await Product.findById(id)
        res.render('pages/editProductPage',{product})
    } catch (error) {
        console.log(error)
        res.render('pages/editProductPage',{product : []})
    }
}

module.exports.updateProduct = async (req, res) => {
    try {
        let { id } = req.params;
        await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.redirect('/viewProductPage');
    } catch (error) {
        console.log(error);
        res.redirect('/viewProductPage');
    }
};