const multer = require('multer');
const fs = require('fs');

const defaultPath = 'Public';
const storage = multer.diskStorage({
    destination: async(req, file, cb) => {
        const folder = (file.fieldname === 'newPFP')? 'ProfilePicture' : (file.fieldname === 'newId')? 'IdCards' : 'Property';
        let directoryExists = fs.existsSync(`${defaultPath}/${folder}`)
        if(!directoryExists) {
            await fs.promises.mkdir(`${defaultPath}/${folder}`, {
                recursive: true
            });
        }
        
        cb(null, `${defaultPath}/${folder}`);
    },
    filename: (req, file, cb) => {
        cb(null, 'PIMG-' + Date.now() + Math.random() + '.' + file.mimetype.split('/')[1])
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

exports.multerUpload = multer({storage: storage, fileFilter: fileFilter});