const db = require('../../models');
const property = db.property;
const propertyImages = db.propertyImages;
const category = db.category;
const room = db.room;

module.exports = {
    getProperty: async(req, res) => {
        try {
            const location = req.query.location || ''
            const startDate = new Date(req.query.start).getTime()|| Date.now();
            const endDate = req.query.end || '';
            const { limit, page } = req.query;

            const result = await property.findAll({
                include: [
                    {
                        model: room,
                    },
                    {
                        model: propertyImages
                    },
                    {
                        model: category
                    }
                ],
                order: [
                    ['rooms', 'price', 'ASC']
                ],
                limit: limit*page || 5
            });

            const count = await property.count();
            
            return res.status(200).send({
                isError: true,
                message: 'data fetched !',
                data: {
                    count: count,
                    rows: result
                }
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