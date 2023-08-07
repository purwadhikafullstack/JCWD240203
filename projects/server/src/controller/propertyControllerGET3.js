const db = require('../../models');
const property = db.property;
const propertyImages = db.propertyImages;
const propertyFacility = db.propertyFacility;
const facility = db.facility;
const category = db.category;
const room = db.room;

module.exports = {
    getPropertyDetail: async(req, res) => {
        try {
            const id = req.params.propertyId;
            
            let result = await property.findOne({
                include: [
                    { 
                        model: propertyFacility,
                        include: [{model: facility}]
                    },
                    { model: category },
                    { model: room },
                    { model: propertyImages },
                ],
                where: {
                    id: id
                },
                order: [
                    [{model: propertyImages} ,'id', 'ASC']
                ],
            });

            return res.status(200).send({
                isError: true,
                message: 'GET Success !',
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
}