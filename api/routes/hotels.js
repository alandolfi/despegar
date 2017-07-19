const express = require("express");
const router = express.Router();

const models = require("../model");
const createError = require("../modules/create-error");

router.get("/", (req, res, next) => {
  models.hotels
    .getAll()
    .then(hotels => res.json(hotels))
    .catch(err => next(createError(500, "internal server error", err.message)));
});

router.get("/:id", (req, res, next) => {
  models.hotels
    .getById(req.params.id)
    .then(hotel => res.json(hotel))
    .catch(err => next(createError(500, "internal server error", err.message)));
});

module.exports = router;
