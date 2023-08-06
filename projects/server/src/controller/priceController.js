const db = require('../../models');
const price = db.price;

module.exports = {
    createPrice: async(req, res) => {
        try {
            const { roomId, percentage, start, end, type } = req.body

            await price.create({
                roomId: roomId,
                percentage: percentage,
                start: start,
                end: end,
                type: type
            });

            return res.status(201).send({
                isError: false,
                message: 'Price created !',
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