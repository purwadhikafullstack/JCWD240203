const jwt = require('jsonwebtoken');
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
    }
}