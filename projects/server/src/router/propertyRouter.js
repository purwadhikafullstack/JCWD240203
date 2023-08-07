const express = require('express');
const { propertiesGET, propertiesPOST, reviews, propertiesGET2, propertiesPATCH } = require('../controller');
const upload = require('../middleware/upload');
const Authorization = require('../middleware/Authorization');

const Router = express.Router();

// GET //
Router.get('/', propertiesGET.getProperty);
// treat id as propertyId
Router.get('/:id', propertiesGET.propertyDetailed);

// treat id as userId
Router.get('/review/:propertyId', reviews.getPropertyReview);

Router.get('/:id/:propertyId', Authorization.isOwner, propertiesGET2.getPropertyDetail);

// POST //
Router.post('/', upload.uploadPropertyImages, Authorization.isCurrentUser, Authorization.isHost, propertiesPOST.addProperty);

Router.post('/review', reviews.createReview);

// PATCH //
Router.patch('/:id', upload.uploadPropertyImages, Authorization.isCurrentUser, Authorization.isHost, propertiesPATCH.updateProperty);

module.exports = Router;