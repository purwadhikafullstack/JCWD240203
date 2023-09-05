const db = require('../models');
const fs = require('fs');
const handlebars = require('handlebars');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const transporter = require('../transport/transport');
require('dotenv').config();
const user = db.user;

module.exports = {
    sendPasswordResetEmail: async(req, res) => {
        try {
            const { username } = req.body;
            const code = Math.floor(Math.random()*90000) + 10000;

            if(!username) {
                return res.status(400).send({
                    isError: true,
                    message: 'bad request !',
                    data: null
                });
            }

            const userFilter = {accountType: 'Local'};

            if(username.includes('@') && username.includes('.com')) {userFilter.email = username;}
            else {userFilter.username = username;}

            const recipient = await user.findOne({
                where: userFilter
            });

            if(!recipient) {
                return res.status(200).send({
                    isError: false,
                    message: 'User does not exist !',
                    data: {userExist: false}
                });
            }

            const token = jwt.sign({code: code}, process.env.PRIVATE_KEY, {expiresIn: '10m'});

            await user.update({code: token}, {
                where: {id: recipient.id}
            });
            
            const template = handlebars.compile(
                fs.readFileSync('./src/Public/templates/resetPassword.html', {encoding: 'utf-8'})
            );

            const data = {"username": recipient.username,"code": code}

            const emailTemplate = template(data);
            
            transporter.sendMail({
               from: 'nodemailer',
               to: `${recipient.email}`,
               subject: 'Reset Password',
               html: emailTemplate
            })

            return res.status(200).send({
                isError: false,
                message: 'Email has been sent !',
                data: {userExist: true}
            });
        }
        catch(error) {
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            });
        }
    },

    resetPassword: async(req, res) => {
        try {
            const {username, code, newPassword} = req.body;

            if(!username || !code || !newPassword) {
                return res.status(400).send({
                    isError: true,
                    message: 'bad request !',
                    data: null
                });
            }

            const userFilter = {accountType: 'Local'};

            if(username.includes('@') && username.includes('.com')) {userFilter.email = username;}
            else {userFilter.username = username;}

            const existingUser = await user.findOne({
                where: userFilter
            });

            if(!existingUser) {
                return res.status(404).send({
                    isError: true,
                    message: 'not found !',
                    data: null
                });
            };

            let storedCode = null;

            try {storedCode = jwt.verify(existingUser.code, process.env.PRIVATE_KEY);}
            catch(error) {
                return res.status(500).send({
                    isError: true,
                    message: 'Code expired !',
                    data: null
                });
            }

            if(storedCode.code !== Number(code)) {
                return res.status(404).send({
                    isError: true,
                    message: 'Incorrect Code !',
                    data: null
                });
            };

            const hash = await bcrypt.hash(newPassword, Number(10));

            await user.update({
                password: hash,
                code: null
            }, {
                where: {id: existingUser.id}
            })

            return res.status(201).send({
                isError: false,
                message: 'Password has been reset !',
                data: null
            });
        }
        catch(error) {
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },

    changePassword: async(req, res) => {
        try {
            const {userId, password, newPassword} = req.body;

            if(!userId || !password || !newPassword) {
                return res.status(400).send({
                    isError: true,
                    message: 'bad request !',
                    data: null
                });
            }

            const existingUser = await user.findOne({
                where: {id: userId}
            });

            if(!existingUser) {
                return res.status(404).send({
                    isError: true,
                    message: 'Bad request !',
                    data: null
                });
            };

            const compare = await bcrypt.compare(password, existingUser.password);

            if(!compare) {
                return res.status(400).send({
                    isError: true,
                    message: 'Incorrect Password !',
                    data: null
                });
            };

            const hash = await bcrypt.hash(newPassword, Number(10));

            await user.update({password: hash}, {
                where: {id: existingUser.id}
            });

            return res.status(201).send({
                isError: false,
                message: 'Password has been changed !',
                data: null
            });
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