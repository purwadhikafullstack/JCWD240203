const db = require('../../models');
const property = db.property;

module.exports = {
    deleteProperty: async(req, res) => {
        try {
            const { userId, propertyId } = req.params;

            const result = await property.findOne({where: {id: propertyId, userId: userId}});

            if(!result) {
                return res.status(404).send({
                    isError: true,
                    message: 'not found !',
                    data: null
                });
            };

            await property.update({status: 'Deleted'}, {where: {id: propertyId}});

            return res.status(200).send({
                isError: true,
                message: 'Property has been deleted !',
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