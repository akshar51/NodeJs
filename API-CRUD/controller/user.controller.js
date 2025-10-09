const User = require("../model/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAlluser = async (req,res)=>{
    try {
        let data = await User.find({})
        return res.status(200).json({success : true , data})
    } catch (error) {
        return res.status(500).json({success : false,data : [],error : error.message})
    }
}

const getUser = async (req,res)=>{
    try {
        const {id} = req.params
        let data = await User.findById(id)
        return res.status(200).json(data)
    } catch (error) {
        res.status(500).json({success : false,data : null,error : error.message})
    }
}
const deleteUser = async (req,res)=>{
    try {
        const {id} = req.params
        let data = await User.findByIdAndDelete(id)
        return res.status(200).json({message : 'User deleted',success : true,id : data.id})
    } catch (error) {
        res.status(500).json({message : error.message,success : false})
    }
}
const createUser = async (req,res)=>{
    try {
        req.body.password = await bcrypt.hash(req.body.password,10)
        let user = await User.create(req.body)
        return res.status(200).json({message : 'success',data : user })
    } catch (error) {
        return res.status(200).json({message : 'error',error : error.message })
    }
}
const updateUser = async (req,res)=>{
    try {
        const {id} = req.params
        req.body.password = await bcrypt.hash(req.body.password,10)
        let data = await User.findByIdAndUpdate(id)
        return res.status(200).json({message : 'User updated',success : true,id : data.id})
    } catch (error) {
        res.status(500).json({message : error.message,success : false})
    }
}

const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        let user = await User.findOne({email})

        if(user){
                let isValid = await bcrypt.compare(password,user.password)
            if(isValid){
                let payload = {
                id : user.id,
                role : 'user',
                }
                let token = jwt.sign(payload,'private-key')
                console.log(token)
                res.status(200).json({message : "Login successful..."})
            }else{
                res.status(200).json({message : "Invalid password..."})
            }
        }else{
            res.status(500).json({message:'user not found'})
        }
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}


module.exports = {getAlluser,getUser,deleteUser,createUser,updateUser,login}