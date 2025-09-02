module.exports.userAuth = (req,res,next)=>{
    const {userId} = req.cookies

    if(userId){
        next()
    }else{
        res.redirect('/login')
    }
}