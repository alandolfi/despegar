const express = require("express");
const router = express.Router();

const models = require("../model");
const createError = require("../modules/create-error");


const insert = (req, res, next) => {
  models.likes
    .add(req.body)
    .then(like => res.status(201).json(like))
    .catch(err => next(createError(500, "internal server error", err.message)));
};

const update = (req, res, next) => {
  
  models.likes
    .update(req.body)
    .then(like => res.json(like))
    .catch(err => next(createError(500, "internal server error", err.message)));
};

router.post("/", insert);
router.put("/", update);
router.patch("/:id", update);

module.exports = router;
