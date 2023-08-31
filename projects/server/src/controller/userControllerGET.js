const db = require('../../models');
const { Op } = require('sequelize');
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
                        where: {[Op.or]: [{status: 'Public'}, {status: 'Private'}]},
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
                    [{model: property} ,'id', 'ASC'],
                    [{model: property}, {model: propertyImages} ,'id', 'ASC']
                ],
                attributes: ['id', 'username', 'email', 'desc', 'phoneNumber', 'gender', 'birthDate', 'profilePicture', 'idCard', 'status', 'accountType']
            });

            if(!existingUser) {
                return res.status(404).send({
                    isError: true,
                    message: 'not found !',
                    data: null
                })
            }

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
    }
}