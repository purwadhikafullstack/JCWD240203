const express = require('express');
const { categories } = require('../controller');

const Router = express.Router();


Router.get('/', categories.getCategories);

module.exports = Router