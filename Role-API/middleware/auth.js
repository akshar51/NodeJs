const jwt = require('jsonwebtoken');
const dotenv = require('../config/config.env');

const userAuth = (req,res,next)=>{
    const {token} = req.cookies
    let decode = jwt.verify(token,dotenv.PRIVATE_KEY)

    next()
}

module.exports = userAuth