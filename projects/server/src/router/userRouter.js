const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const { usersPOST, usersGET, usersPATCH, usersPATCH2 } = require('../controller');
const { uploadUserImage } = require('../middleware/upload');
const Authorization = require('../middleware/Authorization');

const Router = express.Router();

// GET //
Router.get('/:id', usersGET.getUser);

// POST //
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
},usersPOST.register);

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
}, usersPOST.login);

// PATCH //
Router.patch('/accountVerify', usersPATCH.verifyEmail);

Router.patch('/changepassword', usersPATCH2.changePassword);

Router.patch('/forgotpassword', usersPATCH2.sendPasswordResetEmail);

Router.patch('/resetpassword', usersPATCH2.resetPassword);

Router.patch('/:id', Authorization.isOwner, uploadUserImage, usersPATCH.updateUser);

Router.patch('/verify/:id', Authorization.isOwner, usersPATCH.sendEmail);

module.exports = Router;