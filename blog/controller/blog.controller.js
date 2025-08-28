const User = require("../model/userAuth")
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

module.exports.signup = async (req,res)=>{
    try {
        const {password,confirmPassword} = req.body

        if(password === confirmPassword){
            req.body.password = await bcrypt.hash(req.body.password,10)
            await User.create(req.body)
            console.log("User Created")
            res.redirect('/login')
        }
        else{
            console.log("Password & Confirm password not match")
            res.redirect(req.get('Referrer' || '/'));
        }
    } catch (error) {
        console.log(error)
        res.redirect(req.get('Referrer') || '/')
    }
}

module.exports.login = async (req,res)=>{
    try {
        let { email,password} = req.body;
        let user = await User.findOne({email})

        if(user){
            let isValid = await bcrypt.compare(password,user.password)

            if(isValid){
                res.cookie('userId',user.id)
                console.log("Login Successful")
                return res.redirect('/')
            }
            else{
                console.log("Wrong Password...")
                res.redirect(req.get('Referrer')|| '/')
            }
        }else{
            console.log('User not found')
            res.redirect(req.get('Referrer') || '/')
        }
    } catch (error) {
        console.log(error)
    }
}