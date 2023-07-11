const db = require('../../models');
const bcrypt = require('bcrypt');
const user = db.user;

module.exports = {
    register: async(req, res) => {
        try {
            const {name, email, password, gender, birthDate, phoneNumber} = req.body;

            const existingUser = await user.findAll();

            for(i of existingUser) {
                if(i.name === name || i.email === email) {
                    return res.status(400).send({
                        isError: true,
                        message: 'username or email has been taken !',
                        data: null
                    });
                }
            }
            
            const hash = await bcrypt.hash(password, 10);

            await user.create({
                name: name,
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
    }
}