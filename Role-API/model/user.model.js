const { default: mongoose } = require("mongoose")
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : 'employee',
        enum : ['employee','manager','admin'],
    },
},{
    timestamps : true
})

userSchema.pre('save',async function (next) {
    
    if(!this.isModified('password')) return next()

    try {
        this.password = await bcrypt.hash(this.password,10)
        next()
    } catch (error) {
        console.log(error.message)
        next()
    }
})

const User = mongoose.model('userTbl',userSchema)

module.exports = User