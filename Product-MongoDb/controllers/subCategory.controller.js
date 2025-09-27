const SubCategory = require("../models/subcategory.model")

exports.create = (req,res)=>{
    res.render('pages/sub-category')
}

exports.createData = async (req,res)=>{
    try {
        await SubCategory.create(req.body)
        console.log("Sub-Category created...")
        res.redirect(req.get('Referrer')||'/')
    } catch (error) {
        console.log(error.message)
        res.redirect(req.get('Referrer')||'/')
    }
}

exports.view = async (req,res)=>{
    try {
        let subcategory = await SubCategory.find({})
        res.render('pages/view-sub-category',{subcategory})
    } catch (error) {
        console.log(error.message)
        res.render('pages/view-sub-category',{subcategory : []})
    }
}

exports.delete = async (req,res)=>{
    try {
        let {id} = req.params
        await SubCategory.findByIdAndDelete(id)
        res.redirect(req.get('Referrer')||'/')
    } catch (error) {
        console.log(error.message)
        res.redirect(req.get('Referrer')||'/')
    }
}

exports.editSubCategory = async (req,res)=>{
    try {
        let {id} = req.params
        let subCategory = await SubCategory.findById(id)
        res.render('pages/editSubCategory',{subCategory})
    } catch (error) {
        console.log(error.message)
        res.render('pages/editSubCategory',{subCategory : []})
    }
}

exports.updateSubCategory = async (req,res)=>{
    try {
        let {id} = req.params
        await SubCategory.findByIdAndUpdate(id,req.body,{new : true})
        res.redirect('/subcategory/view')
    } catch (error) {
        console.log(error.message)
        res.redirect('/subcategory/view')
    }
}