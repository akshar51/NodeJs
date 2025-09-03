const User = require("../model/userModel")

module.exports.signup = async (req,res)=>{
    try {
        console.log(req.body)
        let user = await User.create(req.body)
        return res.json({message:'User created',data:user})
    } catch (error) {
        return res.json({error:true,message:error.message})
    }
}