const db = require('../models');
const { Op } = require('sequelize');
const property = db.property;
const propertyimages = db.propertyimages;
const category = db.category;
const room = db.room;
const price = db.price;
const review = db.review;
const transaction = db.transaction;

module.exports = {
    getProperty: async(req, res) => {
        try {
            const location = req.query.location || ''
            const startDate = (!isNaN(new Date(req.query.start)))? new Date(req.query.start) : new Date().setHours(0, 0, 0, 0);
            const endDate = (!isNaN(new Date(req.query.end)))? new Date(req.query.end) : new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0);
            const { limit, page, sort, type } = req.query;

            let propertyFilter = {
                status: 'Public'
            };

            if(location) {propertyFilter.city = location};

            let categoryFilter = {};

            if(type && type !== 'All') {categoryFilter.type = type};

            let transactionFilter = {
                status: 'completed',
                [Op.or]: [
                    {
                        checkIn: {[Op.lte]: startDate},
                        checkOut: {[Op.gte]: startDate}
                    },
                    {
                        checkIn: {[Op.lte]: endDate},
                        checkOut: {[Op.gte]: endDate}
                    },
                    {
                        checkIn: {[Op.gte]: startDate},
                        checkOut: {[Op.lte]: endDate}
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

            let result = await property.findAndCountAll({
                where: propertyFilter,
                include: [
                    {
                        model: room,
                        include: [
                            {
                                model: transaction,
                                where: transactionFilter,
                                required: false
                            },
                            {
                                model: price,
                                where: priceFilter,
                                required: false,
                            }
                        ],
                        where: {deleted: 'false'},
                        required: false
                    },
                    { 
                        model: category,
                        where: categoryFilter,
                        required: true
                    },
                    { model: propertyimages },
                    { model: review }
                ],
                order: [
                    ['rooms', 'price', 'ASC'],
                    ['propertyimages','id', 'ASC'],
                    ['reviews', 'rating', 'ASC']
                ],
                //offset: limit*(page - 1) || 0,
                //limit: limit*page || 5,
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
                else {result.count -= 1};
            });

            result.rows = result.rows.map((property) => {
                let temp = 0;
                if(property.reviews.length > 0) {
                    property.reviews.forEach((review) => {
                        temp += review.rating;
                    })
                    temp /= property.reviews.length;
                }
                property.average = temp.toFixed(2);

                property.rooms.forEach((room) => {
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
                        room.price = specialPrice;
                    }
                });
                return property;
            });

            if(sort === 'Price') {
                result.rows = result.rows.sort((p1, p2) => (p1.rooms[0].price > p2.rooms[0].price) ? 1 : (p1.rooms[0].price < p2.rooms[0].price) ? -1 : 0);
            }
            else if (sort === 'Review') {
                result.rows = result.rows.sort((p1, p2) => (p1.average < p2.average) ? 1 : (p1.average > p2.average) ? -1 : 0);
            }
            result.rows.splice(limit*page - 1, result.count - limit*page);
            
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
    }
}