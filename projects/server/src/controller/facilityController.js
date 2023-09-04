const db = require('../models');
const facility = db.facility;

module.exports = {
    getFacility: async(req, res) => {
        try {
            const result = await facility.findAll();

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
    }
}