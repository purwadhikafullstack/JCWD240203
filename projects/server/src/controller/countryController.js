const db = require('../models');
const country = db.country;
const city = db.city;

module.exports = {
    getCountry: async(req, res) => {
        try {
            const result = await country.findAll({
                include: [
                    {
                        model: city,
                    }
                ]
            })

            return res.status(200).send({
                isError: false,
                message: 'GET Success !',
                data: result
            })
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