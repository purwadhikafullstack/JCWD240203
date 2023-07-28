const db = require('../../models');
const review = db.review;
const property = db.property;

module.exports = {
    createReview: async(req, res) => {
        try {
            const {userId, propertyId, rating, description} = req.body;

            const dataExist = property.findOne({
                where: {
                    id: propertyId
                }
            })

            if(!dataExist) {
                return res.status(404).send({
                    isError: true,
                    message: 'not found',
                    data: null
                });   
            }

            await review.create({
                userId: userId,
                propertyId: propertyId,
                rating: rating,
                description: description
            })

            return res.status(201).send({
                isError: false,
                message: 'Review posted !',
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