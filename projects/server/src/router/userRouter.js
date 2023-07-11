const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const { users } = require('../controller');

const Router = express.Router();

Router.post('/', async(req, res, next) => {
    console.log(req.body);
    await checkSchema({
        'name': {
            errorMessage: 'name must not be empty !',
            notEmpty: true
        },
        'email': {
            errorMessage: 'email must be valid !',
            isEmail: true
        },
        'password': {
            errorMessage: 'password must not be empty !',
            notEmpty: true
        },
    }).run(req);

    const result = validationResult(req);

    if(!result.isEmpty()) {
        return res.status(400).send({
            isError: true,
            message: result.errors,
            data: null  
        });
    }
    else {
        next();
    }
},users.register);

module.exports = Router;