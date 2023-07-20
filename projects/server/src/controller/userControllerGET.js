const db = require('../../models');
const { deleteFiles } = require('../helper/deleteFiles');
require('dotenv').config();
const user = db.user;
const property = db.property;
const propertyImages = db.propertyImages;
const category = db.category;
const review = db.review;

module.exports = {
    getUser: async(req, res) => {
        try {
            const id = req.params.id;
            let existingUser = await user.findOne({
                include: [
                    {
                        model: property,
                        include: [
                            {
                                model: propertyImages
                            },
                            {
                                model: category
                            },
                            {
                                model: review
                            }
                        ],
                        required: false
                    }
                ],
                where: {
                    id: id
                },
                order: [
                    [{model: property}, {model: propertyImages} ,'id', 'ASC']
                ],
                attributes: ['id', 'username', 'email', 'desc', 'phoneNumber', 'gender', 'birthDate', 'profilePicture', 'idCard', 'status']
            });
            existingUser = JSON.parse(JSON.stringify(existingUser, null, 2));
            existingUser.properties = existingUser.properties.map((property) => {
                let parsed = JSON.parse(JSON.stringify(property, null, 2))
                let temp = 0;
                if(property.reviews.length > 0) {
                    property.reviews.forEach((review) => {
                        temp += review.rating;
                    })
                    temp /= property.reviews.length;
                }
                parsed.average = temp;
                return parsed;
            })

            return res.status(200).send({
                isError: false,
                message: `Welcome ${existingUser.username}`,
                data: existingUser
            })
        }
        catch(error) {
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },
    updateUser: async(req, res) => {
        const t = await db.sequelize.transaction();
        const id = req.params.id;
        const newUsername = req.body.newUsername;
        const newEmail = req.body.newEmail;
        const newPhoneNumber = req.body.newPhoneNumber;
        const gender = req.body.gender;
        const birthDate = req.body.birthDate;
        const newDesc = req.body.newDesc;
        const newPFP = req?.files?.newPFP;
        const newId = req?.files?.newId;
        try {
            const dataExist = await user.findOne({
                where : {
                    id: id
                }
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
                where: {
                    id: id
                },
                transaction: t
            })
            
            let old = [];
            for(let i in req?.files) {
                if(i === 'newPFP' && dataExist.profilePicture && dataExist.profilePicture !== process.env.LINK + '/Default/DefaultProfile.png') {
                    old.push({path: 'Public/' + dataExist.profilePicture.split(`${process.env.LINK}/`)[1]})
                }
                else if(i === 'newId' && dataExist.idCard) {
                    old.push({path: 'Public/' + dataExist.idCard.split(`${process.env.LINK}/`)[1]})
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
    }
}