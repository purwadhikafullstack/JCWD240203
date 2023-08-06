const db = require('../../models');
const review = db.review;
const property = db.property;
const user = db.user;

module.exports = {
    createReview: async(req, res) => {
        try {
            const {userId, propertyId, rating, description} = req.body;

            const dataExist = property.findOne({
                where: {
                    id: propertyId
                }
            })

            const hasReviewed = await review.findOne({
                where: {
                    userId: userId
                }
            });

            if(!dataExist) {
                return res.status(404).send({
                    isError: true,
                    message: 'not found',
                    data: null
                });   
            }
            else if (Object.keys(hasReviewed).length > 0) {
                return res.status(404).send({
                    isError: true,
                    message: 'User can only review a property once',
                    data: null
                })
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
    },

    getPropertyReview: async(req, res) => {
        try {
            const { propertyId } = req.params;
            const { limit, page } = req.query;

            const result = await review.findAndCountAll({
                where: {
                    propertyId: propertyId
                },
                include: [
                    {
                        model: user
                    }
                ],
                limit: limit*page || 5
            })

            return res.status(200).send({
                isError: false,
                message: 'GET Success',
                data: result
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