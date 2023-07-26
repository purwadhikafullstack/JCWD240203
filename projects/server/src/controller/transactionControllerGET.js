const db = require('../../models');
const { Op } = require('sequelize');
const transaction = db.transaction;
const property = db.property;
const propertyImages = db.propertyImages;
const room = db.room;
require('dotenv').config();

module.exports = {
    getTransaction: async(req, res) => {
        try {
            const { id }= req.params;
            const { limit, page, status } = req.query;

            const filter = {
                userId: id
            };

            if(status !== 'all' && (status === 'pending' || status === 'completed' || status === 'cancelled')) {
                filter.status = status
            };
            
            const result = await transaction.findAndCountAll({
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
                    {
                        model: room
                    }
                ],
                order: [
                    [{model: property}, {model: propertyImages} ,'id', 'ASC'],
                    ['id', 'ASC']
                ],
                limit: limit * page || 999999999999,
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

    getOrder: async(req, res) => {
        try {
            const { id }= req.params;
            const { limit, page, status } = req.query;

            const filter = {};
            if(status !== 'all' && (status === 'pending' || status === 'completed' || status === 'cancelled')) {
                filter.status = status
            };

            const result = await transaction.findAndCountAll({
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
                    {
                        model: room
                    }
                ],
                order: [
                    [{model: property}, {model: propertyImages} ,'id', 'ASC'],
                    ['id', 'ASC']
                ],
                limit: limit * page || 999999999999,
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

    getCompleted: async(req, res) => {
        try {
            const { id } = req.params;
            const { year } = req.query;

            const result = await transaction.findAndCountAll({
                where: {
                    status: 'completed',
                    [Op.and]: db.sequelize.where(db.sequelize.fn('year',db.sequelize.col('transaction.updatedAt')), year)
                },
                include: [
                    {
                        model: property,
                        where: {
                            userId: id
                        },
                        required: true
                    },
                    {
                        model: room
                    }
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