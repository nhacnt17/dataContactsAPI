const cartRoute = require("express").Router();

const cartCtr = require('../controllers/cart.controller')

cartRoute.post('/pushCart', cartCtr.pushCart);
cartRoute.get('/get-list', cartCtr.getList);
cartRoute.post('/decrease-quantity', cartCtr.decreaseQuantity);
cartRoute.post('/increase-quantity', cartCtr.increaseQuantity);


module.exports = cartRoute