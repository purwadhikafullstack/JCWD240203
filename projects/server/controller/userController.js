const db = require('../models');
const bcrypt = require('bcrypt');
const user = db.user;

module.exports = {
    register: async(req, res) => {
        try {
            return res.status(200).send({
                isError: false,
                message: 'Login Success !',
                data: null
            });
        }
        catch(error) {
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            });
        }
    }
}