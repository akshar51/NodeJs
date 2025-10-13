const User = require("../model/user.model")

exports.createUser = async (req,res)=>{
    try {
        await User.create(req.body)
        return res.status(201).json({message : "User created..."})
    } catch (error) {
        return res.status(400).json({message : error.message ,errorStack : error.stack})
    }
}