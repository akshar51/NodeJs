const { mongo, default: mongoose } = require("mongoose")

const db = async()=>{
    try {
        await mongoose.connect('mongodb+srv://aksharparekh401:12345@cluster0.ncwztql.mongodb.net/changePassword')
        console.log("Database connected...")
    } catch (error) {
        console.log(error)        
    }
}

module.exports = db