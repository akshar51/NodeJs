const Category = require("../models/category.model");
const Product = require("../models/product.model");
const fs = require("fs");
const SubCategory = require("../models/subcategory.model");

exports.homePage = (req, res) => {
  res.render("pages/index");
};

exports.formBasicPage = async (req, res) => {
  try {
    let category = await Category.find({})
    let subCategory = await SubCategory.find({})
    res.render("pages/form-basic",{category,subCategory});
  } catch (error) {
    console.log(error.message)
    res.render("pages/form-basic",{category:[],subCategory:[]});
  }
};

exports.editPage = (req, res) => {
  res.render("pages/editPage");
};

exports.tablePage = async (req, res) => {
  try {
    let product = await Product.find({}).populate('categoryId').populate('subCategoryId')
    return res.json(product)
    // res.render("pages/table", { product });
  } catch (error) {
    console.log(error.message);
    res.render("pages/table", { product: [] });
  }
};

exports.formBasic = async (req, res) => {
  try {
    let image = req.file ? req.file.path : "";
    await Product.create({ ...req.body, image });
    console.log("Product Created...");
    res.redirect(req.get("Referrer") || "/");
  } catch (error) {
    console.log(error.message);
    res.redirect(req.get("Referrer") || "/");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let { id } = req.params;
    let product = await Product.findByIdAndDelete(id);

    if (product && product.image && fs.existsSync(product.image)) {
      fs.unlinkSync(product.image);
    }
    res.redirect(req.get("Referrer") || "/");
  } catch (error) {
    console.log(error.message);
    res.redirect(req.get("Referrer") || "/");
  }
};

exports.editProduct = async (req, res) => {
  try {
    let { id } = req.params;
    let product = await Product.findById(id);
    res.render("pages/editPage", { product });
  } catch (error) {
    console.log(error.message);
    res.render("pages/editPage", { product: [] });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let { id } = req.params;
    await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.redirect("/table");
  } catch (error) {
    console.log(error.message);
    res.redirect("/table");
  }
};
