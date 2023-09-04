const db = require('../models');
const { Op } = require('sequelize');
const propertyFacility = db.propertyFacility;
const propertyImages = db.propertyImages;
const property = db.property;
const facility = db.facility;
const review = db.review;
const user = db.user;

module.exports = {
    propertyDetailed: async(req, res) => {
        try {
            const propertyId = req.params.propertyId;
            
            let result = await property.findOne({
                include: [
                    {
                        model: user,
                        attributes: ['id', 'username', 'email', 'desc', 'phoneNumber', 'gender', 'birthDate', 'profilePicture', 'idCard', 'status']
                    },
                    { 
                        model: propertyFacility,
                        include: [{model: facility}]
                    },
                    { model: propertyImages },
                    { model: review}
                ],
                where: {
                    id: propertyId,
                    status: 'Public'
                },
                order: [
                    [{model: propertyImages} ,'id', 'ASC']
                ],
            });

            if(!result) {
                return res.status(404).send({
                    isError: true,
                    message: 'not found !',
                    data: null
                })
            };
            
            result = JSON.parse(JSON.stringify(result, null, 2));

            let temp = 0;
            if(result.reviews.length > 0) {
                result.reviews.forEach((review) => {
                    temp += review.rating;
                })
                temp /= result.reviews.length;
            }
            result.average = temp.toFixed(2);

            return res.status(200).send({
                isError: true,
                message: 'GET Success !',
                data: result
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