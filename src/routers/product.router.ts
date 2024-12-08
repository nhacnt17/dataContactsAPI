const productRoute = require("express").Router();

const productCtr = require('../controllers/product.controller')

productRoute.get('/get-list', productCtr.getAll)


module.exports = productRoute