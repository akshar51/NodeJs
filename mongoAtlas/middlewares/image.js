const multer = require("multer");
const path = require('path');
const fs = require('fs')


const uploadDirec = path.join(__dirname,'../uploads')
 
if(!fs.existsSync(uploadDirec)){
    fs.mkdirSync(uploadDirec,{recursive : true})
}

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,uploadDirec)
    },
    filename : function (req,file,cb){
        cb(null,Date.now() + "-" + file.originalname)
    }
})

const image = multer({storage : storage}).single("image")

module.exports = image