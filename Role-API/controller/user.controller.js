const User = require("../model/user.model")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require("../config/config.env");

exports.createUser = async (req,res)=>{
    try {
        await User.create(req.body)
        return res.status(201).json({message : "User created..."})
    } catch (error) {
        return res.status(400).json({message : error.message ,errorStack : error.stack})
    }
}

exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body
        let user = await User.findOne({email})
        
        if(user){
            let isValid = await bcrypt.compare(password,user.password)

            if (isValid) {
                let payload = {
                    id : user.id,
                    role : user.role
                }

                let token = jwt.sign(payload , dotenv.PRIVATE_KEY)
                res.cookie('token',token)
                return res.status(200).json({message : "Login successfull..."})
            } else {
                return res.status(401).json({message : "Invalid password..."})
            }
        }else{
            return res.status(401).json({message : "User not found..."})
        }    

    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}