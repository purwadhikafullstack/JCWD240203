const db = require('../../models');
const fs = require('fs');
const handlebars = require('handlebars');
const jwt = require('jsonwebtoken');
const transporter = require('../transport/transport');
require('dotenv').config();
const user = db.user;

module.exports = {
    sendPasswordResetEmail: async(req, res) => {
        try {
            const { email } = req.body;
            const code = Math.floor(Math.random()*90000) + 10000;

            const recipient = await user.findOne({
                where: {email: email}
            });

            if(!recipient) {
                return res.status(404).send({
                    isError: true,
                    message: 'User does not exist !',
                    data: null
                });
            }

            const token = jwt.sign({code: code}, process.env.KEY, {expiresIn: '1h'});

            await user.update({
                code: token
            }, {
                where: {
                    id: recipient.id
                }
            });
            
            const template = handlebars.compile(
                fs.readFileSync('./Public/templates/resetPassword.html', {encoding: 'utf-8'})
            );

            const domain = process.env.DOMAIN;
            const path = `resetpassword`;
            const data = {
                "username": recipient.username,
                "domain": domain,
                "path": path,
                "code": token
            }

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