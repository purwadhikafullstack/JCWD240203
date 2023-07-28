const express = require('express');
const { properties, propertiesPOST, reviews } = require('../controller');
const upload = require('../middleware/upload');
const Authorization = require('../middleware/Authorization');

const Router = express.Router();

// GET //
Router.get('/', properties.getProperty);

Router.get('/:id', properties.propertyDetailed);

// POST //
//Router.post('/', upload.uploadPropertyImages, Authorization.isCurrentUser, propertiesPOST.addProperty);

Router.post('/review', reviews.createReview);

module.exports = Router;