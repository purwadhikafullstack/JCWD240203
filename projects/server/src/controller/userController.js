const db = require('../../models');
const bcrypt = require('bcrypt');
const user = db.user;

module.exports = {
    register: async(req, res) => {
        try {
            const {username, email, password, gender, birthDate, phoneNumber} = req.body;

            const existingUser = await user.findAll();

            for(i of existingUser) {
                if(i.username === username || i.email === email) {
                    return res.status(400).send({
                        isError: true,
                        message: 'username or email has been taken !',
                        data: null
                    });
                }
            }
            
            const hash = await bcrypt.hash(password, 10);

            await user.create({
                username: username,
                password: hash,
                email: email,
                gender: gender,
                birthDate: birthDate || null,
                phoneNumber: phoneNumber || null
            });

            return res.status(200).send({
                isError: false,
                message: 'Register Success !',
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
    },

    login: async(req, res) => {
        try {
            const {username, password} = req.body;

            let existingUser;

            if(username.includes('@') && username.includes('.com')) {
                existingUser = await user.findOne({
                    where: {
                        email: username
                    }
                });
            }
            else {
                existingUser = await user.findOne({
                    where: {
                        username: username
                    }
                });
            };

            if(!existingUser) {
                return res.status(400).send({
                    isError: true,
                    message: 'incorrent credentials !',
                    data: null
                })
            };

            const verify = await bcrypt.compare(password, existingUser.password);

            if(!verify) {
                return res.status(400).send({
                    isError: true,
                    message: 'incorrent credentials !',
                    data: null
                })
            }

            return res.status(200).send({
                isError: false,
                message: `Welcome ${existingUser.username}`,
                data: {
                    username: existingUser.username,
                    email: existingUser.email,
                    phoneNumber: existingUser.phoneNumber,
                    gender: existingUser.gender,
                    birthDate: existingUser.birthDate,
                    profilePicture: existingUser.profilePicture,
                    idCard: existingUser.idCard,
                    states: existingUser.status
                }
            })
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