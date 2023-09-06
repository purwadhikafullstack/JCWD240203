const multer = require('multer');
const fs = require('fs');
const { join } = require('path');

const defaultPath = join(__dirname, '../Public');
const storage = multer.diskStorage({
    destination: async(req, file, cb) => {
        const folder = 'PaymentProofs';
        let directoryExists = fs.existsSync(`${defaultPath}/${folder}`)
        if(!directoryExists) {
            await fs.promises.mkdir(`${defaultPath}/${folder}`, {
                recursive: true
            });
        }
        
        cb(null, `${defaultPath}/${folder}`);
    },
    filename: (req, file, cb) => {
        cb(null, 'PP-' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
});

const fileFilter = (req, file, cb) => {
    const fileType = file.mimetype.split('/')[1];
    if(fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
        cb(null, true);
    }
    else {
        cb(new Error('file not supported'));
    }
}

exports.multerUploadPayment = multer({storage: storage, fileFilter: fileFilter});