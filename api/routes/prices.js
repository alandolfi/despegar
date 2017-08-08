const express = require("express");
const router = express.Router();

const models = require("../model");
const createError = require("../modules/create-error");

router.get("/", (req, res, next) => {
  models.hotels
    .getAll(req.params.pag)
    .then(hotels => {
        var ids = hotels.map(hotel => hotel.id).join(',');
        prices.ge
      res.json(hotels)
    })
    .catch(err => next(createError(500, "internal server error", err.message)));
});

module.exports = router;
