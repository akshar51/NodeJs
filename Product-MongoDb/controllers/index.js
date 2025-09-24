const Product = require("../models/product.model")
const path = require('path')


exports.homePage = (req,res)=>{
    res.render('pages/index')
}

exports.tablePage = async (req,res)=>{
    try {
        let product = await Product.find({})
        res.render('pages/table',{product})
    } catch (error) {
        console.log(error.message)
        res.render('pages/table',{product : []})
    }
}

exports.formBasicPage = (req,res)=>{
    res.render('pages/form-basic')
}

exports.formBasic = async (req,res)=>{
    try {
        console.log(req.body)
        req.body.image = req.file.path
        await Product.create(req.body)
        console.log('Product Created...')
        res.redirect(req.get('Referrer')|| '/')
    } catch (error) {
        console.log(error.message)
        res.redirect(req.get('Referrer')|| '/')
    }
}