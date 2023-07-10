const express = require('express');
const { checkSchema } = require('express-validator');

const Router = express.Router();

Router.post('/', async(req, res, next) => {
    await checkSchema({
        'username': {
            errorMessage: 'username must not be empty !',
            notEmpty: true
        },
        'password': {
            errorMessage: 'password must not be empty !',
            notEmpty: true
        },
        'email': {
            errorMessage: 'must be a valid email !',
            isEmail: true
        },
        'phoneNumber': {
            errorMessage: 'must be a valid phone number !',
            isMobilePhone: true
        },
    })
})

module.exports = Router;