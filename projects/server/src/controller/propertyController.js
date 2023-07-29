const db = require('../../models');
const { Op } = require('sequelize');
const property = db.property;
const propertyImages = db.propertyImages;
const propertyFacility = db.propertyFacility;
const facility = db.facility;
const category = db.category;
const room = db.room;
const review = db.review;
const transaction = db.transaction;
const user = db.user

module.exports = {
    getProperty: async(req, res) => {
        try {
            const location = req.query.location || ''
            const startDate = (!isNaN(new Date(req.query.start)))? new Date(req.query.start) : new Date();
            const endDate = (!isNaN(new Date(req.query.end)))? new Date(req.query.end) : new Date();
            const { limit, page } = req.query;

            const locationFilter = {
                    city: (location)? location : {[Op.like]: '%%'}
            };
            let transactionFilter = {
                status: 'completed',
                [Op.and]: [{
                    checkIn: {[Op.lte]: startDate},
                    checkOut: {[Op.gt]: endDate}
                }]
            };
            
            if(startDate > endDate) {
                delete transactionFilter[Op.and][0].checkIn;
                transactionFilter[Op.and][0].checkOut[Op.gt] = startDate;
            }

            let result = await property.findAndCountAll({
                include: [
                    {
                        model: room,
                        include: [
                            {
                                model: transaction,
                                where: transactionFilter,
                                required: false
                            }
                        ],
                        where: {
                            stock: {
                                [Op.gt]: 0
                            }
                        }
                    },
                    { model: propertyImages },
                    { model: category },
                    { model: review }
                ],
                order: [
                    ['rooms', 'price', 'ASC'],
                    ['propertyImages','id', 'ASC'],
                    ['reviews', 'rating', 'ASC']
                ],
                limit: limit*page || 5,
                where: locationFilter,
                distinct: true
            });

            result = JSON.parse(JSON.stringify(result, null, 2));

            result.rows = result.rows.filter((property) => {
                filteredRoom = property.rooms.filter((room) => {
                    let temp = 0;
                    for(let transaction of room.transactions) {
                        if(room.id === transaction.roomId) {temp += transaction.stock};
                        if(temp >= room.stock) {break};
                    }
                    if(room.stock > temp) {return room}; 
                })
                property.rooms = filteredRoom;
                if(filteredRoom.length > 0) {return property}
            });

            result.rows = result.rows.map((property) => {
                let temp = 0;
                if(property.reviews.length > 0) {
                    property.reviews.forEach((review) => {
                        temp += review.rating;
                    })
                    temp /= property.reviews.length;
                }
                property.average = temp;
                return property;
            })

            result.rows = result.rows.sort((p1, p2) => (p1.average < p2.average) ? 1 : (p1.average > p2.average) ? -1 : 0);
            
            return res.status(200).send({
                isError: true,
                message: 'data fetched !',
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
    },
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
                    { model: room },
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