const orderRoute = require("express").Router();

const OrderCtrl = require('../controllers/order.controller')


orderRoute.get('/get-list', OrderCtrl.getAll)

module.exports = orderRoute