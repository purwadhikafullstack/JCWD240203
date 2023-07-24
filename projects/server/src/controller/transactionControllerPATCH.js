const db = require('../../models');
const { Op } = require('sequelize');
const { deleteFiles } = require('../helper/deleteFiles');
const transaction = db.transaction;
const property = db.property;
const propertyImages = db.propertyImages;
const room = db.room;
require('dotenv').config();

module.exports = {
    updatePaymentProof: async(req, res) => {
        const paymentProof = req.files.paymentProof;
        const { id } = req.body;
        const t = await db.sequelize.transaction();
        try {
            const dataExist = await transaction.findOne({
                where: {
                    id: id
                }
            });

            if(!dataExist) {
                return res.status(404).send({
                    isError: true,
                    message: 'not found',
                    data: null
                })
            }

            await transaction.update({
                paymentProof: (paymentProof)? `${process.env.LINK}/PaymentProofs/${paymentProof[0].filename}` : dataExist.paymentProof
            }, {
                where: {
                    id: id
                },
                transaction: t
            })

            await t.commit();

            let old = [];
            for(let i in req?.files) {
                if(dataExist.paymentProof && dataExist.paymentProof !== process.env.LINK + '/Default/DefaultTransaction.png') {
                    old.push({path: 'Public/' + dataExist.paymentProof.split(`${process.env.LINK}/`)[1]})
                }
            }

            if(old.length > 0) {
                deleteFiles(old)
            }

            return res.status(200).send({
                isError: true,
                message: 'Payment proof uploaded !',
                data: null
            })
        }
        catch(error) {
            for(let i in req?.files) {deleteFiles(req.files[i])};
            await t.rollback();
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    }
}