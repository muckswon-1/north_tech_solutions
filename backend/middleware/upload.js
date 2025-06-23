const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadsDir = path.join(__dirname, '..', 'uploads');

if(!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir)
};



const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, path.join(__dirname,'..','uploads'))
    },
    filename: function (req,file,cb){
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9 );
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
})

const upload = multer({storage});

module.exports = upload;