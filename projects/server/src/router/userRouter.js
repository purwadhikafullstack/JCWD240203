const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const { users } = require('../controller');
const Authorization = require('../middleware/Authorization');

const Router = express.Router();

Router.get('/:id', users.getUser);

Router.post('/', async(req, res, next) => {
    await checkSchema({
        'username': {
            errorMessage: 'username must not be empty !',
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

Router.post('/login', async(req, res, next) => {
    await checkSchema({
        'username': {
            errorMessage: 'Username must not be empty !',
            notEmpty: true,
        },
        'password': {
            errorMessage: 'Password must not be empty !',
            notEmpty: true
        }
    }).run(req)

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
}, users.login);

module.exports = Router;