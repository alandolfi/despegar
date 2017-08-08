const express = require("express");
const router = express.Router();

const models = require("../model");
const createError = require("../modules/create-error");


router.get("/:pag", (req, res, next) => {
  models.hotels
    .getAll(req.params.pag)
    .then(hotels => {
        let ids;
        let hotelEnabled = [];

        if(hotels.length > 10){
            let totalItems = hotels.length;
            let count = Math.ceil((totalItems / 2))
            let initSlice = 0;
            let cantItems = 10;
            let finSlice = 9;
            let promises = [];  

            for(var i=0;i<count;i++){

                promises.push(new Promise((resolve, reject) => {
                        ids =  hotels.slice(initSlice,finSlice).map(hotel => hotel.id).join(',');
                        initSlice = finSlice + 1;
                        finSlice = cantItems * (i+2);
                        models.prices.getAllPrices(ids).then(response => {
                            let prices = JSON.parse(response);  
                            let hotelIds = prices.items.filter(pr => pr.price_detail).map(p => p.hotel_id);
                            let hotelsFilter = hotels.filter(hotel => hotelIds.includes(hotel.id));
                            
                            hotelsFilter.forEach(function(hotel) {                   
                              let pricesSelected = prices.items.find(p => p.hotel_id === hotel.id);
                              hotel.currency = pricesSelected.price_detail.currency;
                              hotel.total = pricesSelected.price_detail.total;
                            }, this); 

                            return resolve(hotelsFilter);
                        });
                    }));
            }


            Promise.all(promises).then(values => { 
              values.forEach(h => {
                  h.forEach(item => {
                      hotelEnabled.push(item);
                  });
              })
              
              res.json(hotelEnabled);
            });

        }else{
            ids = hotels.map(hotel => hotel.id).join(',');

            models.prices.getAllPrices(ids).then(response =>{
              let prices = JSON.parse(response);  
              let hotelIds = prices.items.filter(pr => pr.price_detail).map(p => p.hotel_id);
              hotelEnabled = hotels.filter(hotel => hotelIds.includes(hotel.id));
              
              hotelEnabled.forEach(function(hotel) {                   
                let pricesSelected = prices.items.find(p => p.hotel_id === hotel.id);
                hotel.currency = pricesSelected.price_detail.currency;
                hotel.total = pricesSelected.price_detail.total;
              }, this); 
        
              res.json(hotelEnabled)
            });
        }
    })
    .catch(err => next(createError(500, "internal server error", err.message)));
});


router.get("/:pag", (req, res, next) => {
  models.hotels
    .getAll(req.params.pag,null)
    .then(hotel => res.json(hotel))
    .catch(err => next(createError(500, "internal server error", err.message)));
});

module.exports = router;
