const db = require('../../models');
const { Op } = require('sequelize');
const transaction = db.transaction;
const property = db.property;
const room = db.room;
const user = db.user;
require('dotenv').config();

module.exports = {
    getCurrent: async(req, res) => {
        try {
            const { id } = req.params;

            let transactionFilter = {
                status: 'completed',
                [Op.and]: [{
                    checkIn: {[Op.lte]: new Date()},
                    checkOut: {[Op.gte]: new Date()}
                }]
            };

            const result = await transaction.findAndCountAll({
                where: transactionFilter,
                include: [
                    {
                        model: property,
                        where: {
                            userId: id
                        },
                        required: true
                    },
                    {model: user},
                    {model: room}
                ],
                order: [
                    ['id', 'ASC']
                ],
                distinct: true
            });

            return res.status(200).send({
                isError: false,
                message: 'GET Success',
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
    },

    getCheckingOut: async(req, res) => {
        try {
            const { id } = req.params;

            let day = new Date();
            day.setDate(day.getDate() - 2);

            let transactionFilter = {
                status: 'completed',
                checkOut: {[Op.between]: [day, new Date()]},
            };

            const result = await transaction.findAndCountAll({
                where: transactionFilter,
                include: [
                    {
                        model: property,
                        where: {
                            userId: id
                        },
                        required: true
                    },
                    {model: user},
                    {model: room}
                ],
                order: [
                    ['id', 'ASC']
                ],
                distinct: true
            });

            return res.status(200).send({
                isError: false,
                message: 'GET Success',
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
    },

    getUpcoming: async(req, res) => {
        try {
            const { id } = req.params;

            let min = new Date();
            min.setDate(min.getDate() + 1);
            let max = new Date();
            max.setDate(max.getDate() + 5);

            let transactionFilter = {
                status: 'completed',
                checkIn: {[Op.between]: [min, max]},
            };

            const result = await transaction.findAndCountAll({
                where: transactionFilter,
                include: [
                    {
                        model: property,
                        where: {
                            userId: id
                        },
                        required: true
                    },
                    {model: user},
                    {model: room}
                ],
                order: [
                    ['id', 'ASC']
                ],
                distinct: true
            });

            return res.status(200).send({
                isError: false,
                message: 'GET Success',
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