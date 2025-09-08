const User = require("../model")
const bcrypt = require('bcrypt')

module.exports.homePage = (req,res)=>{
    res.render('pages/index')
}

module.exports.signupPage = (req,res)=>{
    res.render('pages/signup')
}

module.exports.loginPage = (req,res)=>{
    res.render('pages/login')
}

module.exports.signup =async (req,res)=>{
    try {
        req.body.password = await bcrypt.hash(req.body.password,10)
        await User.create(req.body)
        console.log("User created...")
        res.redirect('/login')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports.logout = (req,res)=>{
    req.logout(()=>{
        return res.redirect('/')
    })
}