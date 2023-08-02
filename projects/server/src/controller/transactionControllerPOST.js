const db = require('../../models');
const { Op } = require('sequelize');
const transaction = db.transaction;
const property = db.property;
const room = db.room;
require('dotenv').config();

module.exports = {
    createTransaction: async(req, res) => {
        try {
            const {userId, propertyId, roomId, checkIn, checkOut, stock} = req.body;
            if(isNaN(new Date(checkIn)) || isNaN(new Date(checkOut)) || !userId || !propertyId || !roomId) {
                return res.status(400).send({
                    isError: true,
                    message: 'bad request',
                    data: req.body
                })
            };

            let existingTransaction = await transaction.findAll({
                where: {
                    [Op.or]: [{status: 'pending'}, {status: 'completed'}],
                    userId: userId,
                    propertyId: propertyId,
                    roomId: roomId,
                    checkOut: {[Op.gte]: new Date()}
                }
            })
            
            if(existingTransaction?.length > 0) {
                return res.status(400).send({
                    isError: true,
                    message: 'You already booked in this property',
                    data: null
                });
            }

            let transactionFilter = {
                status: 'completed',
                roomId: roomId,
                [Op.and]: [{
                    checkIn: {[Op.lte]: new Date(checkIn)},
                    checkOut: {[Op.gte]: new Date(checkIn)}
                }]
            };

            let result = await property.findOne({
                where: {
                    id: propertyId
                },
                include: [
                    {
                        model: room,
                        where: {
                            id: roomId
                        },
                        required: false
                    },
                    {
                        model: transaction,
                        where: transactionFilter,
                        required: false
                    }
                ]
            })
            result = JSON.parse(JSON.stringify(result, null, 2));

            let temp = 0;
            result.transactions.forEach((value) => {
                temp += value.stock
            });

            if(temp >= result.rooms[0].stock) {
                return res.status(400).send({
                    isError: false,
                    message: 'Room unavailable !',
                    data: null
                })
            }
            
            await transaction.create({
                userId: userId,
                propertyId: propertyId,
                roomId: roomId,
                stock: stock,
                paymentProof: `${process.env.LINK}/Default/DefaultTransaction.png`,
                status: 'pending',
                checkIn: checkIn,
                checkOut: checkOut
            })

            return res.status(200).send({
                isError: false,
                message: 'transaction created !',
                data: null
            })
        }
        catch(error) {
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },
}