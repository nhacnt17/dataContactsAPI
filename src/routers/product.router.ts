const productRoute = require("express").Router();

const productCtr = require('../controllers/product.controller')

productRoute.get('/get-list', productCtr.getAll)
productRoute.get('/get-detail/:id', productCtr.getDetail)


module.exports = productRoute