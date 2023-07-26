const db = require('../../models');
const deleteFiles = require('../helper/deleteFiles');
const property = db.property;
const propertyImages = db.propertyImages;
const room = db.room;
const price = db.price;

module.exports = {
    addProperty: async(req, res) => {
        const t = await db.sequelize.transaction();
        try {
            const images = req.files.images;

            await t.commit();
            return res.status(201).send({
                isError: false,
                message: 'Property added !',
                data: null
            })
        }
        catch {
            for(let i in req?.files) {deleteFiles(req.files[i])};
            await t.rollback();
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            });
        }
    }
}