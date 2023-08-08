const express = require('express');
const { categories } = require('../controller');
const Authorization = require('../middleware/Authorization');

const Router = express.Router();

Router.get('/', categories.getCategories);

Router.post('/', Authorization.isCurrentUser, Authorization.isHost, categories.createCategory);

module.exports = Router