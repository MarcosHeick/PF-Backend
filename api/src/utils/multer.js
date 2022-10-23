const multer = require('multer');

const path = require('path');


const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, '/uploads')
    // },
    
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb({ message: 'unsupported file format' }, false)
        } else {
            cb(null, file.originalname)
        }

    }
})

const upload = multer({
    storage: storage
})
module.exports = upload