const db = require('../../models');
const transaction = db.transaction;

module.exports = {
    createTransaction: async(req, res) => {
        try {
            const {userId, propertyId, roomId, checkIn, checkOut, stock} = req.body;
            if(isNaN(new Date(checkIn)) || isNaN(new Date(checkOut)) || !userId || !propertyId || !roomId) {
                return res.status(500).send({
                    isError: true,
                    message: 'bad request',
                    data: null
                })
            }
            await transaction.create({
                userId: userId,
                propertyId: propertyId,
                roomId: roomId,
                stock: stock,
                status: 'completed',
                checkIn: checkIn,
                checkOut: checkOut
            })

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
    }
}