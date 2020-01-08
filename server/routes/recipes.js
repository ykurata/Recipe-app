const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

const auth = require("./middleware/utils");

router.post("/", auth, (req, res, next) => {
  const newRecipe = new Recipe({
    userId: req.user,
    name: req.body.name,
    ingredients: req.body.ingredients,
    steps: req.body.steps
  });

  newRecipe.save((err, recipe) => {
    if (err) return next(err);
    res.json(recipe);
  });
});

module.exports = router;