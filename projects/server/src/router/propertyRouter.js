const express = require('express');
const { propertiesGET, propertiesPOST, reviews, propertiesGET2, propertiesPATCH, propertiesGET3, propertiesPATCH2 } = require('../controller');
const upload = require('../middleware/upload');
const Authorization = require('../middleware/Authorization');

const Router = express.Router();

// GET //
Router.get('/', propertiesGET.getProperty);

Router.get('/:propertyId', propertiesGET2.propertyDetailed);

Router.get('/review/:propertyId', reviews.getPropertyReview);

// treat id as userId
Router.get('/:id/:propertyId', Authorization.isOwner, propertiesGET3.getPropertyDetail);

// POST //
Router.post('/', upload.uploadPropertyImages, Authorization.isCurrentUser, Authorization.isHost, propertiesPOST.addProperty);

Router.post('/review', reviews.createReview);

// PATCH //
Router.patch('/:id', upload.uploadPropertyImages, Authorization.isCurrentUser, Authorization.isHost, propertiesPATCH.updateProperty);

// treat id as userId
Router.patch('/delete/:id/:propertyId', Authorization.isOwner, Authorization.isHost, propertiesPATCH2.deleteProperty);

module.exports = Router;