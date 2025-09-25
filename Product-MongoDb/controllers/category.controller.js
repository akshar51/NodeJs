const Category = require("../models/category.model")

module.exports.addCategory = (req,res)=>{
    res.render('pages/add-category')
}

module.exports.addCategoryData = async (req,res)=>{
    try {
        await Category.create(req.body)
        console.log("Category created...")
        res.redirect(req.get('Referrer')||'/')
    } catch (error) {
        console.log(error.message)
        res.redirect(req.get('Referrer')||'/')
    }
}

module.exports.viewData = async (req,res)=>{
    try {
        let category = await Category.find({})
        res.render('pages/view-category',{category})
    } catch (error) {
        console.log(error.message)
        res.render('pages/view-category',{category:[]})
    }
}

module.exports.deleteCategory = async (req,res)=>{
    try {
        let {id} = req.params
        await Category.findByIdAndDelete(id)
        res.redirect(req.get('Referrer')|| '/')
    } catch (error) {
        console.log(error.message)
        res.redirect(req.get('Referrer')|| '/')
    }
}