const userRoute = require("express").Router();

const UserCtrl = require('../controllers/user.controller')


userRoute.get('/get-list', UserCtrl.getAll)
userRoute.delete('/:id', UserCtrl.delete)

module.exports = userRoute