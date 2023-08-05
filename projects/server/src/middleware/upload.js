const { multerUpload } = require('./multer');
const { multerUploadPayment } = require('./multerPayment');
const { deleteFiles } = require('../helper/deleteFiles');

module.exports = {
    uploadUserImage: (req, res, next) => {
        const multerResult = multerUpload.fields([{name: 'newPFP', maxCount: 1}, {name: 'newId', maxCount: 1}]);
        multerResult(req, res, function(err) {
            try {
                if(err) throw err;

                req.files?.images?.forEach(value => {
                    if(value.size > 1048576) throw {message: `${value.originalname} is too large`, fileToDelete: req.files}
                })
                next()
            }
            catch(error) {
                if(error.fileToDelete) {
                    deleteFiles(fileToDelete);
                }
                return res.status(404).send({
                    isError: true,
                    message: error.message,
                    data: null
                })
            }
        })
    }, 

    uploadPaymentProof: (req, res, next) => {
        const multerResult = multerUploadPayment.fields([{name: 'paymentProof', maxCount: 1}]);
        multerResult(req, res, function(err) {
            try {
                if(err) throw err;

                req.files?.images?.forEach(value => {
                    if(value.size > 1048576) throw {message: `${value.originalname} is too large`, fileToDelete: req.files}
                })
                next()
            }
            catch(error) {
                if(error.fileToDelete) {
                    deleteFiles(fileToDelete);
                }
                return res.status(404).send({
                    isError: true,
                    message: error.message,
                    data: null
                })
            }
        }) 
    },

    uploadPropertyImages: (req, res, next) => {
        const multerResult = multerUpload.fields([{name: 'images', maxCount: 6}]);
        multerResult(req, res, function(err) {
            try {
                console.log(req.files);
                if(err) throw err;

                req.files?.images?.forEach(value => {
                    if(value.size > 1048576) throw {message: `${value.originalname} is too large`, fileToDelete: req.files}
                })
                next()
            }
            catch(error) {
                if(error.fileToDelete) {
                    deleteFiles(fileToDelete);
                }
                console.log(error);
                return res.status(404).send({
                    isError: true,
                    message: error.message,
                    data: null
                })
            }
        })
    }, 
}