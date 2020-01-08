const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const auth = require("./middleware/utils");

// Create a recipe 
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


// Update a recipe
router.put("/update/:id", auth, (req, res, next) => {
  Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
    if (err) return next(err);
    recipe.name = req.body.name,
    recipe.ingredients = req.body.ingredients,
    recipe.steps = req.body.steps

    recipe.save((err, recipe) => {
      if (err) return next(err);
      res.status(200).json(recipe);
    });
  });
});


// Get all recipes 
router.get("/list", auth, (req, res, next) => {
  Recipe.find({}, (err, recipes) => {
    if (err) return next(err);
    res.status(200).json(recipes);
  });
});


// Delete a recipe
router.delete("/delete/:id", auth, (req, res, next) => {
  Recipe.remove({ _id: req.params.id}, (err, recipe) => {
    if (err) return next(err);
    res.json({ message: "Successfully deleted" });
  })
})

module.exports = router;