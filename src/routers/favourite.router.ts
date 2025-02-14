const favouriteRoute = require("express").Router();

const favouriteCtr = require('../controllers/favourite.controller')

favouriteRoute.post('/add', favouriteCtr.pushFavou);
favouriteRoute.delete('/remove', favouriteCtr.removeFavou);
favouriteRoute.get('/get-list', favouriteCtr.getListFavou);
favouriteRoute.get('/check', favouriteCtr.getFavouStatus);


module.exports = favouriteRoute