const express = require("express");
const router = express.Router();

const models = require("../model");
const createError = require("../modules/create-error");


router.get("/:pag/:city", (req, res, next) => {
  models.hotels
    .getAll(req.params.pag,req.params.city)
    .then(hotels => {
        var ids;
        var hotelEnabled = [];

        if(hotel.length > 10){
            var totalItems = hotel.length;
            var count = Math.ceil((totalItems / 2))
            var initSlice = 0;
            var cantItems = 10;
            var finSlice = 9;


            for(var i=0;i<count;i++){
                ids =  hotels.slice(initSlice,finSlice).map(hotel => hotel.id).join(',');
                initSlice = finSlice + 1;
                finSlice = cantItems * (i+2);

                models.prices.getAllPrices(ids).then(response =>{
                  var prices = JSON.parse(response);  
                  var hotelIds = prices.items.filter(pr => pr.price_detail).map(p => p.hotel_id);
                  hotelEnabled = hotels.filter(hotel => hotelIds.includes(hotel.id));
                  
                  hotelEnabled.forEach(function(hotel) {                   
                    var pricesSelected = prices.items.find(p => p.hotel_id === hotel.id);
                    hotel.currency = pricesSelected.price_detail.currency;
                    hotel.total = pricesSelected.price_detail.total;
                  }, this); 
            
                  //res.json(hotelEnabled)
                });
              }

        }else{
            ids = hotels.map(hotel => hotel.id).join(',');

            models.prices.getAllPrices(ids).then(response =>{
              var prices = JSON.parse(response);  
              var hotelIds = prices.items.filter(pr => pr.price_detail).map(p => p.hotel_id);
              hotelEnabled = hotels.filter(hotel => hotelIds.includes(hotel.id));
              
              hotelEnabled.forEach(function(hotel) {                   
                var pricesSelected = prices.items.find(p => p.hotel_id === hotel.id);
                hotel.currency = pricesSelected.price_detail.currency;
                hotel.total = pricesSelected.price_detail.total;
              }, this); 
        
              res.json(hotelEnabled)
            });
        }
   
     
       
        
    })
    .catch(err => next(createError(500, "internal server error", err.message)));
});


function callPricesDespegar(ids,hotels,res){
  models.prices.getAllPrices(ids).then(response =>{
        var prices = JSON.parse(response);  
        var hotelIds = prices.items.filter(pr => pr.price_detail).map(p => p.hotel_id);
        hotelEnabled = hotels.filter(hotel => hotelIds.includes(hotel.id));
        
        hotelEnabled.forEach(function(hotel) {                   
          var pricesSelected = prices.items.find(p => p.hotel_id === hotel.id);
          hotel.currency = pricesSelected.price_detail.currency;
          hotel.total = pricesSelected.price_detail.total;
        }, this); 
  
        res.json(hotelEnabled)
      });
}

/*router.get("/:id", (req, res, next) => {
  models.hotels
    .getById(req.params.id)
    .then(hotel => res.json(hotel))
    .catch(err => next(createError(500, "internal server error", err.message)));
});*/

module.exports = router;
