const db = require('../../models');
const fs = require('fs');
const handlebars = require('handlebars');
const jwt = require('jsonwebtoken');
const transporter = require('../transport/transport')
const { deleteFiles } = require('../helper/deleteFiles');
const user = db.user;

module.exports = {
    updateUser: async(req, res) => {
        const t = await db.sequelize.transaction();
        const id = req.params.id;
        const newUsername = req.body?.newUsername;
        const newEmail = req.body?.newEmail;
        const newPhoneNumber = req.body?.newPhoneNumber;
        const gender = req?.body?.gender;
        const birthDate = req?.body?.birthDate || null;
        const newDesc = req?.body?.newDesc;
        const newPFP = req?.files?.newPFP;
        const newId = req?.files?.newId;
        try {
            const dataExist = await user.findOne({
                where : {id: id}
            })

            if(!dataExist) {
                return res.status(400).send({
                    isError: true,
                    message: 'User does not exist !',
                    data: null
                })
            }

            const fields = {
                username: newUsername,
                email: newEmail,
                desc: newDesc,
                phoneNumber: newPhoneNumber,
                gender: gender,
                birthDate: birthDate,
                profilePicture: (newPFP)? process.env.LINK + '/ProfilePicture/' + newPFP[0].filename : dataExist.profilePicture,
                idCard: (newId)? process.env.LINK + '/IdCards/' + newId[0].filename : dataExist.idCard
            }

            if(newEmail !== dataExist.email) {fields.status = 'unverified'};
            
            await user.update(fields, {
                where: {id: id},
                transaction: t
            })
            
            let old = [];
            for(let i in req?.files) {
                if(i === 'newPFP' && dataExist.profilePicture && dataExist.profilePicture !== process.env.LINK + '/Default/DefaultProfile.png') {
                    old.push({path: 'src/Public/' + dataExist.profilePicture.split(`${process.env.LINK}/`)[1]})
                }
                else if(i === 'newId' && dataExist.idCard) {
                    old.push({path: 'src/Public/' + dataExist.idCard.split(`${process.env.LINK}/`)[1]})
                }
            }

            await t.commit();

            if(old.length > 0) {
                deleteFiles(old);
            }
            
            return res.status(200).send({
                isError: false,
                message: 'Changes saved !',
                data: null
            });
        }
        catch(error) {
            for(let i in req?.files) {deleteFiles(req.files[i])};
            await t.rollback()
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            });
        }
    },

    sendEmail: async(req, res) => {
        try {
            const { id } = req.params;
            const verify = Math.floor(Math.random()*90000) + 10000;
            
            const recipient = await user.findOne({
                where: {id: id, status: 'unverified', accountType: 'Local'}
            });

            if(!recipient) {
                return res.status(404).send({
                    isError: true,
                    message: 'Not found',
                    data: null
                });
            }

            const token = jwt.sign({code: verify, id: id}, process.env.KEY, {expiresIn: '1h'});

            await user.update({
                code: token
            }, {
                where: {
                    id: id
                }
            });
            
            const template = handlebars.compile(
                fs.readFileSync('./src/Public/templates/verifyEmail.html', {encoding: 'utf-8'})
            );

            const domain = process.env.DOMAIN;
            const path = `verify`;
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
               subject: 'Account Verification',
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
    },

    verifyEmail: async(req, res) => {
        try {
            const token = req.body.token;
            if(!token) {
                return res.status(500).send({
                    isError: true,
                    message: 'invalid token !',
                    data: null
                })
            }
            const verify = jwt.verify(token, process.env.KEY);
            
            const result = await user.findOne({
                where: {id: id, status: 'unverified', accountType: 'Local'}
            })

            if(!result) {
                return res.status(404).send({
                    isError: true,
                    message: 'Not found',
                    data: null
                });
            }

            const userToken = jwt.verify(result.code, process.env.KEY);

            if(verify.code === userToken.code && verify.id === userToken.id) {
                await user.update({
                    status: 'verified',
                    code: null
                }, {
                    where: {
                        id: verify.id
                    }
                })

                return res.status(200).send({
                    isError: false,
                    message: 'Email has been verified !',
                    data: null
                })
            }
            else {
                return res.status(400).send({
                    isError: true,
                    message: 'Invalid token !',
                    data: null
                })
            }

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