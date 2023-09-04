const db = require('../models');
const category = db.category;

module.exports = {
    getCategories: async(req, res) => {
        try {
            const result = await category.findAll();
            
            return res.status(200).send({
                isError: false,
                message: 'GET success',
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

    createCategory: async(req, res) => {
        try {
            const { type } = req.body;

            await category.create({
                type: type
            });

            return res.status(201).send({
                isError: true,
                message: 'New category created !',
                data: null
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