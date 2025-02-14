const cartRoute = require("express").Router();

const cartCtr = require('../controllers/cart.controller')

cartRoute.post('/pushCart', cartCtr.pushCart);
cartRoute.get('/get-list', cartCtr.getList);
cartRoute.get('/total-price', cartCtr.getTotalPrice);

module.exports = cartRoute