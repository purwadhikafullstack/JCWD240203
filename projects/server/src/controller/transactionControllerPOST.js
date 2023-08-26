const db = require('../../models');
const { Op } = require('sequelize');
const transaction = db.transaction;
const property = db.property;
const price = db.price;
const room = db.room;
const user = db.user;
require('dotenv').config();

module.exports = {
    createTransaction: async(req, res) => {
        try {
            const {userId, propertyId, roomId, checkIn, checkOut, stock} = req.body;
            if(isNaN(new Date(checkIn)) || isNaN(new Date(checkOut)) || !userId || !propertyId || !roomId) {
                return res.status(400).send({
                    isError: true,
                    message: 'Bad Request !',
                    data: null
                })
            };
            
            if((new Date(checkIn) >= new Date(checkOut)) || (new Date(checkIn) < new Date().setHours(0, 0, 0, 0)) || (new Date(checkOut) < new Date().setHours(0, 0, 0, 0))) {
                return res.status(400).send({
                    isError: true,
                    message: 'Bad Request !',
                    data: null
                })
            };

            const propertyWithRoomExist = await property.findOne({
                where: {id: propertyId},
                include: [
                    {
                        model: room,
                        where: {id: roomId, deleted: 'false'},
                        required: true
                    }
                ]
            });

            const userExist = await user.findOne({where: {id: userId}});
            
            if(!propertyWithRoomExist || !userExist) {
                return res.status(400).send({
                    isError: true,
                    message: 'Bad Request !',
                    data: null
                })
            }
            else if (propertyWithRoomExist.status === 'Private') {
                return res.status(400).send({
                    isError: true,
                    message: 'Property is privated !',
                    data: null
                })
            }

            let existingTransaction = await transaction.findOne({
                where: {
                    [Op.or]: [{status: 'pending'}, {status: 'completed'}],
                    userId: userId,
                    propertyId: propertyId,
                    roomId: roomId,
                    checkOut: {[Op.gte]: new Date()}
                }
            })
            
            if(existingTransaction) {
                return res.status(400).send({
                    isError: true,
                    message: 'You already booked in this property',
                    data: null
                });
            }

            let transactionFilter = {
                status: 'completed',
                roomId: roomId,
                [Op.or]: [
                    {
                        checkIn: {[Op.lte]: new Date(checkIn)},
                        checkOut: {[Op.gte]: new Date(checkIn)}
                    },
                    {
                        checkIn: {[Op.lte]: new Date(checkOut)},
                        checkOut: {[Op.gte]: new Date(checkOut)}
                    },
                    {
                        checkIn: {[Op.gte]: new Date(checkIn)},
                        checkOut: {[Op.lte]: new Date(checkOut)}
                    }
                ]
            };

            let priceFilter = {
                start: {[Op.lte]: new Date(checkIn)},
                end: {[Op.gt]: new Date(checkIn)}
            }

            let selectedRoom = await room.findOne({
                where: {
                    id: roomId
                },
                include: [
                    {
                        model: transaction,
                        where: transactionFilter,
                        required: false
                    },
                    {
                        model: price,
                        where: priceFilter,
                        required: false
                    }
                ]
            });

            if(selectedRoom?.length > 0) {
                return res.status(400).send({
                    isError: true,
                    message: 'Bad request !',
                    data: null
                });
            }
            selectedRoom = JSON.parse(JSON.stringify(selectedRoom, null, 2));

            if(selectedRoom?.prices?.length > 0) {
                const originalPrice = selectedRoom.price;
                let specialPrice = 0;
                selectedRoom.prices.forEach((value) => {
                    if(value.type === 'Mark up') {
                        specialPrice = originalPrice + (originalPrice * (value.percentage/100));
                    }
                    else if (value.type === 'Discount') {
                        specialPrice = originalPrice - (originalPrice * (value.percentage/100));
                    }
                })
                selectedRoom.price = specialPrice;
            }

            let occupied = stock;
            selectedRoom.transactions.forEach((value) => {
                occupied += value.stock
            });
            
            if(occupied > selectedRoom.stock) {
                return res.status(400).send({
                    isError: false,
                    message: 'Room unavailable !',
                    data: null
                })
            };

            const grandTotal = (selectedRoom.price * ((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000) * stock );
            
            await transaction.create({
                userId: userId,
                propertyId: propertyId,
                roomId: roomId,
                stock: stock,
                price: grandTotal,
                paymentProof: `${process.env.LINK}/Default/DefaultTransaction.png`,
                status: 'pending',
                checkIn: checkIn,
                checkOut: checkOut
            });

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