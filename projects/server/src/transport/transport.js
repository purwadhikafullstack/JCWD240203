const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ackemicasa@gmail.com',
        pass: 'mnoxqerkpiqylhjk'
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;