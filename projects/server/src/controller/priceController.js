const db = require('../../models');
const price = db.price;

module.exports = {
    createPrice: async (req, res) => {
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
        catch (error) {
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            });
        }
    },
    getPrice: async (req, res) => {
        const { room_id } = req.query;

        try {
            const result = await price.findAll({
                where: { roomId: room_id },
            });

            if (!result || result.length === 0) {
                return res.status(404).send({
                    isError: true,
                    message: "There are no events available for the given room ID",
                    data: null,
                });
            }

            return res.status(200).send({
                isError: false,
                message: "Get Event",
                data: result,
            });
        } catch (error) {
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null,
            });
        }
    }
}