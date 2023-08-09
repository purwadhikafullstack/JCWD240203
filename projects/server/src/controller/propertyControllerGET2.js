const db = require('../../models');
const { Op } = require('sequelize');
const propertyFacility = db.propertyFacility;
const propertyImages = db.propertyImages;
const transaction = db.transaction;
const property = db.property;
const facility = db.facility;
const review = db.review;
const price = db.price;
const room = db.room;
const user = db.user;

module.exports = {
    propertyDetailed: async(req, res) => {
        try {
            const id = req.params.id;
            const startDate = (!isNaN(new Date(req.query.start)))? new Date(req.query.start) : new Date();
            const endDate = (!isNaN(new Date(req.query.end)))? new Date(req.query.end) : new Date();
            const { limit, page } = req.query;
            const userId = req.query.userId;
            
            let transactionFilter = {
                status: 'completed',
                [Op.and]: [{
                    checkIn: {[Op.lte]: startDate},
                    checkOut: {[Op.gte]: startDate}
                }]
            };

            let priceFilter = {
                start: {[Op.lte]: startDate},
                end: {[Op.gte]: startDate}
            };
            
            let result = await property.findOne({
                include: [
                    {
                        model: transaction,
                        where: transactionFilter,
                        required: false
                    },
                    {
                        model: review,
                        include: [
                            {
                                model: user,
                                attributes: ['id', 'username', 'email', 'desc', 'phoneNumber', 'gender', 'birthDate', 'profilePicture', 'idCard', 'status']
                            }
                        ],
                        limit: limit*page || 5
                    },
                    {
                        model: user,
                        attributes: ['id', 'username', 'email', 'desc', 'phoneNumber', 'gender', 'birthDate', 'profilePicture', 'idCard', 'status']
                    },
                    { 
                        model: propertyFacility,
                        include: [{model: facility}]
                    },
                    { 
                        model: room,
                        include: [
                            {
                                model: price,
                                where: priceFilter,
                                required: false
                            }
                        ]
                    },
                    { model: propertyImages },
                ],
                where: {
                    id: id
                },
                order: [
                    [{model: propertyImages} ,'id', 'ASC']
                ],
            })
            const count = await review.count({where: {propertyId: result.id}});
            result = JSON.parse(JSON.stringify(result, null, 2));
            result.hasReviewed = false;
            result.totalReview = count

            result.rooms = result.rooms.filter((room) => {
                let temp = 0;
                for(let transaction of result.transactions) {
                    if(room.id === transaction.roomId) {temp += transaction.stock};
                    if(temp >= room.stock) {break};
                }
                if(room.stock > temp) {return room}; 
            });

            result.rooms.forEach((room) => {
                if(room.prices.length > 0) {
                    const originalPrice = room.price;
                    let specialPrice = 0;
                    room.prices.forEach((value) => {
                        if(value.type === 'Mark up') {
                            specialPrice = originalPrice + (originalPrice * (value.percentage/100));
                        }
                        else if (value.type === 'Discount') {
                            specialPrice = originalPrice - (originalPrice * (value.percentage/100));
                        }
                    });
                    room.price = specialPrice;
                }
            });

            let temp = 0;
            if(result.reviews.length > 0) {
                result.reviews.forEach((review) => {
                    temp += review.rating;
                    if(review.userId === Number(userId)) {result.hasReviewed = true}
                });
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