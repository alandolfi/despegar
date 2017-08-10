const express = require("express");
const router = express.Router();

const models = require("../model");
const createError = require("../modules/create-error");


const insert = (req, res, next) => {
  models.likes.getById(req.body).then(hotel => {
      if(hotel){
        hotel.countLike = hotel.countLike + 1;
        models.likes.update(hotel)
        .then(like => res.json(like))
        .catch(err => next(createError(500, "internal server error", err.message)));
      }else{
        models.likes
        .add(req.body)
        .then(like => res.status(201).json(like))
        .catch(err => next(createError(500, "internal server error", err.message)));
      }
  });
 
};

const update = (req, res, next) => {
  console.log("entre2");
   models.likes.getById(req.body).then(hotel => {
     if(hotel){
       hotel.countLike = hotel.countLike - 1;
       if(hotel.countLike == -1)
          return;

       models.likes.update(hotel)
        .then(like => res.json(like))
        .catch(err => next(createError(500, "internal server error", err.message)));
     }
   });

};

router.post("/", insert);
router.put("/", update);

module.exports = router;
