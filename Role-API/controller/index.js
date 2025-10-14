exports.homePage=(req,res)=>{
    return res.render('index');
}

exports.formBasicPage=(req,res)=>{
    return res.render('./pages/form-basic');
}

exports.LoginPage=(req,res)=>{
    return res.render('./pages/login');
}

exports.RegisterPage=(req,res)=>{
    return res.render('./pages/register');
}