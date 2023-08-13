const db = require('../../models');
const transaction = db.transaction;
const property = db.property;
const review = db.review;
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
            const { limit, page, userId } = req.query;

            let result = await review.findAndCountAll({
                where: {
                    propertyId: propertyId
                },
                include: [
                    {
                        model: user
                    }
                ],
                limit: limit*page || 5
            });
            result = JSON.parse(JSON.stringify(result, null, 2));
            result.hasReviewed = false;
            result.hasVisited = false;

            if(userId) {
                const transactions = await transaction.findOne({
                    where: {
                        propertyId: propertyId,
                        userId: userId
                    }
                });

                if(transactions) {result.hasVisited = true}

                result.rows.forEach((value) => {
                    if(value.userId === Number(userId)) {result.hasReviewed = true};
                })
            };

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