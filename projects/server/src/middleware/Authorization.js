const jwt = require('jsonwebtoken');
const { deleteFiles, formatReqFiles } = require('../helper/deleteFiles');
require('dotenv').config();

module.exports = {
    isOwner: (req, res, next) => {
        try {
            const id = req.params.id;
            let token = req.headers.authorization;
            
            if(!token) {
                return res.status(400).send({
                    isError: true,
                    message: 'unauthorized access !',
                    data: null
                })
            }

            token = token.split(' ')[1];
            const verify = jwt.verify(token, process.env.KEY);
            
            if(!verify || verify.id !== Number(id)) {
                return res.status(400).send({
                    isError: true,
                    message: 'unauthorized access !',
                    data: null
                })
            }

            next()
        }
        catch(error) {
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },

    isCurrentUser: (req, res, next) => {
        try {
            const id = req.body.userId;
            let token = req.headers.authorization;
            
            if(!token) {
                if(req.files) {
                    deleteFiles(formatReqFiles(req.files))
                };
                return res.status(400).send({
                    isError: true,
                    message: 'unauthorized access !',
                    data: null
                })
            }

            token = token.split(' ')[1];
            const verify = jwt.verify(token, process.env.KEY);
            
            if(!verify || verify.id !== Number(id)) {
                if(req.files) {
                    deleteFiles(formatReqFiles(req.files))
                };
                return res.status(400).send({
                    isError: true,
                    message: 'unauthorized access !',
                    data: null
                })
            }

            next()
        }
        catch(error) {
            if(req.files) {
                deleteFiles(formatReqFiles(req.files));
            };
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },

    isHost: (req, res, next) => {
        try {
            const {idCard} = req.body;
            let token = req.headers.authorization;
            
            if(!token) {
                if(req.files) {
                    deleteFiles(formatReqFiles(req.files))
                };
                return res.status(400).send({
                    isError: true,
                    message: 'unauthorized access !',
                    data: null
                })
            }

            token = token.split(' ')[1];
            const verify = jwt.verify(token, process.env.KEY);
            
            if(!verify || verify.status !== 'verified' || !idCard) {
                if(req.files) {
                    deleteFiles(formatReqFiles(req.files))
                };
                return res.status(400).send({
                    isError: true,
                    message: 'unauthorized access !',
                    data: null
                })
            };

            next();
        }
        catch(error) {
            if(req.files) {
                deleteFiles(formatReqFiles(req.files));
            }
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            });
        }
    }
}