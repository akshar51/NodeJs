exports.homePage = (req,res)=>{
    res.render('pages/index')
}

exports.tablePage = (req,res)=>{
    res.render('pages/table')
}

exports.formBasicPage = (req,res)=>{
    res.render('pages/form-basic')
}

exports.formWizardPage = (req,res)=>{
    res.render('pages/form-wizard')
}