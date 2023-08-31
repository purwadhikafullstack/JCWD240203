const db = require('../../models');
const { Op } = require('sequelize');
const { deleteFiles } = require('../helper/deleteFiles');
const transaction = db.transaction;
const property = db.property;
const propertyImages = db.propertyImages;
const room = db.room;
require('dotenv').config();

module.exports = {
    updatePaymentProof: async(req, res) => {
        const paymentProof = req.files.paymentProof;
        const { id } = req.params;
        const t = await db.sequelize.transaction();
        try {
            const dataExist = await transaction.findOne({
                where: {
                    id: id
                }
            });

            if(!dataExist) {
                return res.status(404).send({
                    isError: true,
                    message: 'not found',
                    data: null
                })
            }

            await transaction.update({
                paymentProof: (paymentProof)? `${process.env.LINK}/PaymentProofs/${paymentProof[0].filename}` : dataExist.paymentProof
            }, {
                where: {
                    id: id
                },
                transaction: t
            })

            await t.commit();

            let old = [];
            for(let i in req?.files) {
                if(dataExist.paymentProof && dataExist.paymentProof !== process.env.LINK + '/Default/DefaultTransaction.png') {
                    old.push({path: 'src/Public/' + dataExist.paymentProof.split(`${process.env.LINK}/`)[1]})
                }
            }

            if(old.length > 0) {
                deleteFiles(old)
            }

            return res.status(200).send({
                isError: true,
                message: 'Payment proof uploaded !',
                data: null
            })
        }
        catch(error) {
            for(let i in req?.files) {deleteFiles(req.files[i])};
            await t.rollback();
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },

    updateStatus: async(req, res) => {
        try {
            const { response } = req.body;
            const { id } = req.params;

            const dataExist = await transaction.findOne({
                where: {id: id}
            });

            if(!dataExist) {
                return res.status(404).send({
                    isError: true,
                    message: 'not found',
                    data: null
                })
            };

            if(response === 'completed') {
                let transactionFilter = {
                    status: 'completed',
                    roomId: dataExist.roomId,
                    [Op.and]: [{
                        checkIn: {[Op.lte]: new Date(dataExist.checkIn)},
                        checkOut: {[Op.gte]: new Date(dataExist.checkIn)}
                    }]
                };
    
                let result = await property.findOne({
                    where: {
                        id: dataExist.propertyId
                    },
                    include: [
                        {
                            model: room,
                            where: {
                                id: dataExist.roomId
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
                temp += dataExist.stock;
                
                if(temp > result.rooms[0].stock) {
                    return res.status(400).send({
                        isError: false,
                        message: 'Room unavailable !',
                        data: null
                    })
                }
                else {
                    await transaction.update({
                        status: response
                    }, {
                        where: {id: id}
                    });

                    return res.status(200).send({
                        isError: false,
                        message: 'Order accepted !',
                        data: null
                    });
                }
            }
            else if(response === 'cancelled') {
                await transaction.update({
                    status: response
                }, {
                    where: {id: id}
                });

                return res.status(200).send({
                    isError: false,
                    message: 'Order rejected !',
                    data: null
                });
            }
            return res.status(400).send({
                isError: true,
                message: 'invalid req !',
                data: null
            })
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