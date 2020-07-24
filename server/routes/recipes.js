const express = require("express");
const router = express.Router();

// Load input validation
const validateRecipeInput = require("../validation/recipe");

// import model and auth middleware
const Recipe = require("../models/Recipe");
const auth = require("./middleware/utils");
const upload = require("./service/upload");


// Create a recipe 
router.post("/", auth, async(req, res, next) => {
  try {
    // Form validation
    const { errors, isValid } = validateRecipeInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newRecipe = new Recipe({
      userId: req.user,
      name: req.body.name,
      estimatedTime: req.body.estimatedTime,
      ingredients: req.body.ingredients,
      steps: req.body.steps
    });
    const recipe = newRecipe.save();
    res.status(200).json(recipe);
  } catch(err) {
    console.log(err);
  }
});


router.post("/image/:id", upload.single('recipeImage'), auth, async(req, res) => {
  try {
    const image = new Recipe({
      recipeImage: req.file.location
    });
    const recipe = await image.save();
    res.status(200).json(recipe);
  } catch (err) {
    console.log(err);
  }
});

// Update a recipe
router.put("/update/:id", auth, (req, res) => {
  // Form validation
  const { errors, isValid } = validateRecipeInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
    if (err) return next(err);
    recipe.name = req.body.name,
    recipe.estimatedTime = req.body.estimatedTime,
    recipe.ingredients = req.body.ingredients,
    recipe.steps = req.body.steps
    
    recipe.save()
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(err => {
      res.json(err);
    });
  });
});

// Post like to a recipe
router.put("/like/:id", auth, (req, res) => {
  Recipe.findOne({ _id: req.params.id })
  .then(recipe => {
    if (recipe.likes.filter(like => like.user.toString() === req.user).length > 0) {
      return res.status(404).json({ error: "You already liked the recipe"});
    } else {
      const newLike = {
        user: req.user
      }
      recipe.likes.push(newLike);
      recipe.save()
        .then(recipe => {
          res.status(200).json(recipe);
        })
        .catch(err => {
          res.status(404).json(err);
        });
    }
  })
  .catch(err => {
    res.json(err);
  });
});


// Post a review to a recipe
router.put("/review/:id", auth, (req, res, next) => {
  Recipe.findOne({ _id: req.params.id })
  .then(recipe => {
    const newReview = {
      user: req.user,
      text: req.body.text
    }
    recipe.reviews.push(newReview);
    recipe.save()
      .then(recipe => {
        res.status(200).json(recipe);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  })
  .catch(err => {
    res.json(err);
  });
});


// Get all recipes 
router.get("/list", (req, res, next) => {
  Recipe.find({})
    .populate("userId", "name")
    .exec(function(err, recipes){
      if (err) return next(err);
      res.json(recipes);
    })
});

// Get a specific recipes 
router.get("/get/:id", (req, res, next) => {
  Recipe.findOne({ _id: req.params.id })
    .populate("userId", "name")
    .populate("reviews.user", "name")
    .exec(function(err, recipe) {
      if (err) return next(err);
      res.json(recipe);
    });
});


// Get logged in user's recipes
router.get("/my-recipes", auth, (req, res, next) => {
  Recipe.find({ userId: req.user })
    .populate("userId", "name")
    .populate("reviews.user", "name")
    .exec(function(err, recipe) {
      if (err) return next(err);
      res.json(recipe);
    });
});    


// Get recipes by userId
router.get("/userid/:id", auth, (req, res, next) => {
  Recipe.find({ userId: req.params.id })
    .populate("userId", "name")
    .populate("reviews.user", "name")
    .exec(function(err, recipe) {
      if (err) return next(err);
      res.json(recipe);
    }); 
}) 


// Delete a recipe
router.delete("/delete/:id", auth, (req, res, next) => {
  Recipe.remove({ _id: req.params.id}, (err, recipe) => {
    if (err) return next(err);
    res.json({ message: "Successfully deleted" });
  })
})

module.exports = router;