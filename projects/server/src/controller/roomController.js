const db = require('../models');
const { Op } = require('sequelize');
const transaction = db.transaction;
const price = db.price;
const room = db.room;

module.exports = {
    propertyRooms: async(req, res) => {
        try {
            const propertyId = req.query.propertyId;
            const startDate = (!isNaN(new Date(req.query.start)))? new Date(req.query.start) : new Date().setHours(0, 0, 0, 0);
            const endDate = (!isNaN(new Date(req.query.end)))? new Date(req.query.end) : new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0);
            
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
            
            let result = await room.findAll({
                where: {
                    propertyId: propertyId,
                    deleted: 'false'
                },
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
            });
            result = JSON.parse(JSON.stringify(result, null, 2));
            
            result.forEach((room, index) => {
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
                    if(result[index]) {
                        result[index].price = specialPrice
                    };
                }
            });
            //room.price = specialPrice;

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