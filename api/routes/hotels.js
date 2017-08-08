const express = require("express");
const router = express.Router();

const models = require("../model");
const createError = require("../modules/create-error");
const prices = 

router.get("/:pag", (req, res, next) => {
  models.hotels
    .getAll(req.params.pag)
    .then(hotels => {
        var ids = hotels.map(hotel => hotel.id).join(',');
        var hotelEnabled = [];
        models.prices.getAllPrices(ids).then(response =>{
          var prices = JSON.parse(response);  
          var hotelIds = prices.items.filter(pr => pr.price_detail).map(p => p.hotel_id);
          hotelEnabled = hotels.filter(hotel => hotelIds.includes(hotel.id));
          
          hotelEnabled.forEach(function(hotel) {                   
            hotel.prices = prices.items.find(p => p.hotel_id === hotel.id);
          }, this); 
    
          res.json(hotelEnabled)
        });
    })
    .catch(err => next(createError(500, "internal server error", err.message)));
});

router.get("/:id", (req, res, next) => {
  models.hotels
    .getById(req.params.id)
    .then(hotel => res.json(hotel))
    .catch(err => next(createError(500, "internal server error", err.message)));
});

module.exports = router;
