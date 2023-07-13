const db = require('../../models');
const property = db.property;
const room = db.room;

module.exports = {
    getProperty: async(req, res) => {
        try {
            const location = req.query.location || ''
            const startDate = new Date(req.query.start).getTime()|| Date.now();
            const endDate = req.query.end || '';

            const result = await property.findAll({
                include: [
                    {
                        model: room
                    }
                ]
            });
            
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