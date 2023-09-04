const db = require('../models');
const { Op } = require('sequelize');
const transaction = db.transaction;
const property = db.property;
const propertyImages = db.propertyImages;
const room = db.room;
const user = db.user;
require('dotenv').config();

module.exports = {
    getTransaction: async(req, res) => {
        try {
            const { id }= req.params;
            const { limit, page, status, month, year } = req.query;

            const filter = {userId: id};
            if(status !== 'all' && (status === 'pending' || status === 'completed' || status === 'cancelled')) {
                filter.status = status
            };

            if(!month || (month < 0 || month > 11) || isNaN(new Date(year))) {
                return res.status(400).send({
                    isError: true,
                    message: 'Bad Request !',
                    data: null
                });
            };
            
            filter.createdAt = {[Op.between]: [new Date(year || new Date().getFullYear(), month, 1), new Date(year || new Date().getFullYear(), Number(month) + 1, 0)]}
            let result = await transaction.findAndCountAll({
                where: filter,
                include: [
                    {
                        model: property,
                        include: [
                            {
                                model: propertyImages
                            }
                        ]
                    },
                    {model: room}
                ],
                order: [
                    [{model: property}, {model: propertyImages} ,'id', 'ASC'],
                    ['id', 'ASC']
                ],
                limit: limit * page || 999999999999,
                distinct: true
            });
            result = JSON.parse(JSON.stringify(result, null, 2));

            const outdated = [];
            result?.rows?.forEach((transaction, index) => {
                if(new Date(transaction.checkIn) < new Date().setHours(0, 0, 0, 0) && transaction.status === 'pending') {
                    outdated.push(transaction.id)
                    result.rows[index].status = 'cancelled'
                };
            })
            if(outdated.length > 0) {
                await transaction.update({status: 'cancelled'}, {where: {id: outdated}});
            }

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

    getOrder: async(req, res) => {
        try {
            const { id }= req.params;
            const { limit, page, status, month, year } = req.query;

            let filter = {};
            if(status !== 'all' && (status === 'pending' || status === 'completed' || status === 'cancelled')) {
                filter.status = status
            };

            if(!month || (month < 0 || month > 11) || isNaN(new Date(year))) {
                return res.status(400).send({
                    isError: true,
                    message: 'Bad Request !',
                    data: null
                });
            };
            
            filter.createdAt = {[Op.between]: [new Date(year || new Date().getFullYear(), month, 1), new Date(year || new Date().getFullYear(), Number(month) + 1, 0)]}
            
            let result = await transaction.findAndCountAll({
                where: filter,
                include: [
                    {
                        model: property,
                        include: [
                            {
                                model: propertyImages
                            }
                        ],
                        where: {
                            'userId': id
                        },
                        required: true
                    },
                    {model: room},
                    {model: user}
                ],
                order: [
                    [{model: property}, {model: propertyImages} ,'id', 'ASC'],
                    ['id', 'ASC']
                ],
                limit: limit * page || 999999999999,
                distinct: true
            });
            result = JSON.parse(JSON.stringify(result, null, 2));

            const outdated = [];
            result?.rows?.forEach((transaction, index) => {
                if(new Date(transaction.checkIn) < new Date().setHours(0, 0, 0, 0) && transaction.status === 'pending') {
                    outdated.push(transaction.id)
                    result.rows[index].status = 'cancelled'
                };
            })
            if(outdated.length > 0) {
                await transaction.update({status: 'cancelled'}, {where: {id: outdated}});
            }

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
            })
        }
    },

    getCompleted: async(req, res) => {
        try {
            const { id } = req.params;
            const { type, year, month } = req.query;

            const filter = {
                status: 'completed'
            }

            if((type === 'Yearly' && !year) || (type === 'Daily' && !month)) {
                return res.status(400).send({
                    isError: true,
                    message: 'bad request!',
                    data: null
                })
            }

            if(type === 'Yearly') {
                filter[Op.and] = db.sequelize.where(db.sequelize.fn('year',db.sequelize.col('transaction.updatedAt')), year);
            }
            else if (type === 'Daily') {
                filter[Op.and] = db.sequelize.where(db.sequelize.fn('month',db.sequelize.col('transaction.updatedAt')), month);
            }
            
            const result = await transaction.findAndCountAll({
                where: filter,
                include: [
                    {
                        model: property,
                        where: {
                            userId: id
                        },
                        required: true
                    },
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