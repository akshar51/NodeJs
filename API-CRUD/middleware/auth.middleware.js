const jwt = require("jsonwebtoken")

exports.auth = (req,res,next)=>{
    const {token} = req.cookies

    if(!token){
        return res.status(200).json({message : 'Please Login...'})
    }

    let decode = jwt.verify(token,'private-key')

    if(decode.role == 'admin'){
        return next()
    }

    return res.status(400).json({message : "You are not authorized..."})
}