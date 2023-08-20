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
            const propertyId = req.params.propertyId;
            const startDate = (!isNaN(new Date(req.query.start)))? new Date(req.query.start) : new Date();
            const endDate = (!isNaN(new Date(req.query.end)))? new Date(req.query.end) : new Date();
            const { limit, page } = req.query;
            
            let transactionFilter = {
                status: 'completed',
                [Op.or]: [
                    {
                        checkIn: {[Op.lt]: startDate},
                        checkOut: {[Op.gt]: startDate}
                    },
                    {
                        checkIn: {[Op.lt]: endDate},
                        checkOut: {[Op.gt]: endDate}
                    },
                    {
                        checkIn: {[Op.gt]: startDate},
                        checkOut: {[Op.lt]: endDate}
                    }
                ]
            };

            let priceFilter = {
                [Op.or]: [
                    {
                        start: {[Op.lte]: startDate},
                        end: {[Op.gt]: startDate}
                    }
                ]
            };
            
            let result = await property.findOne({
                include: [
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
                        where: {deleted: 'false'},
                        include: [
                            {
                                model: price,
                                where: priceFilter,
                                required: false
                            },
                            {
                                model: transaction,
                                where: transactionFilter,
                                required: false
                            },
                        ],
                        required: false
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

            const count = await review.count({where: {propertyId: result.id}});
            result = JSON.parse(JSON.stringify(result, null, 2));
            result.totalReview = count;

            result.rooms.forEach((room, index) => {
                let temp = 0;
                for(let transaction of room.transactions) {
                    {temp += transaction.stock};
                    if(temp >= room.stock) {break;}
                }
                if(room.stock <= temp) {result.rooms.splice(index, 1)}; 

                if(room.prices.length > 0) {
                    const originalPrice = room.price;
                    let specialPrice = room.price;
                    room.prices.forEach((value) => {
                        if(value.type === 'Mark up') {
                            specialPrice += (originalPrice * (value.percentage/100));
                        }
                        else if (value.type === 'Discount') {
                            specialPrice -= (originalPrice * (value.percentage/100));
                        }
                    });
                    if(result.rooms[index]) {
                        result.rooms[index].price = specialPrice
                    };
                }
            });
            //room.price = specialPrice;

            let temp = 0;
            if(result.reviews.length > 0) {
                result.reviews.forEach((review) => {
                    temp += review.rating;
                });
                temp /= result.reviews.length;
            };
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