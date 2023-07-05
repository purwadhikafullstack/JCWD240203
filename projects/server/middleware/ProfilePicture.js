const multer = require('multer');
const fs = require('fs');

const defaultPath = 'Public';
const storage = multer.diskStorage({
    destination: async(req, file, cb) => {
        let directoryExists = fs.existsSync(`${defaultPath}/ProfilePicture`)
        if(!directoryExists) {
            await fs.promises.mkdir(`${defaultPath}/ProfilePicture`, {
                recursive: true
            });
        }
        
        cb(null, `${defaultPath}/ProfilePicture`);
    },
    filename: (req, file, cb) => {
        cb(null, 'PFP-' + Date.now() + '.' + file.mimetype.split('.')[1])
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