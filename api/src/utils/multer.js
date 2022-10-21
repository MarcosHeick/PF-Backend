const multer = require('multer');

const path = require('path');

module.exports = multer({

    storage: multer.diskStorage({}),

    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(
                new Error(
                    'formato de archivo para la imagen no soportado, solo .jpg .jpeg .png'
                ),
                false
            );
            return;
        }
        cb(null,true);
    }

})