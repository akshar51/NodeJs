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

module.exports.emailConfirmPage = (req,res)=>{
    res.render('pages/emailConfirm')
}

module.exports.verifyOtpPage = (req,res)=>{
    res.render('pages/verifyOtp')
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

module.exports.changePassPage = (req,res)=>{
    return res.render('pages/changePassword')
}

module.exports.changePass = async (req,res)=>{
    let {id} = req.params;
    let {oldpassword,newpassword,confirmpassword} = req.body
    let user = await User.findById(id)
    let isValid = await bcrypt.compare(oldpassword,user.password)

    if(isValid){
        if(newpassword == confirmpassword){
            user.password = await bcrypt.hash(newpassword,10)
            await user.save()
            console.log("Password change successfully...")
            req.flash('success','Password change successfully...')
            res.redirect('/login')
        }
        else{
            req.flash('error','New and Confirm password not match..')
            console.log("New and Confirm password not match..")
            res.redirect(req.get('Referrer' || '/'))
        }
    }   
    else{
        req.flash('error','Old password not match...')
        console.log("Old password not match...")
        res.redirect(req.get('Referrer' || '/'))
    }
}