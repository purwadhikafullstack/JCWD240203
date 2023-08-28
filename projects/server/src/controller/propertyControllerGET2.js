const db = require('../../models');
const { Op } = require('sequelize');
const propertyFacility = db.propertyFacility;
const propertyImages = db.propertyImages;
const transaction = db.transaction;
const property = db.property;
const facility = db.facility;
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