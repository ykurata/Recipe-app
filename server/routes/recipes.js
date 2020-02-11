const express = require("express");
const router = express.Router();
const multer = require("multer");

// Load input validation
const validateRecipeInput = require("../validation/recipe");

// import model and auth middleware
const Recipe = require("../models/Recipe");
const auth = require("./middleware/utils");


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// Create a recipe 
router.post("/", upload.single('recipeImage'), auth, (req, res, next) => {
  // Form validation
  const { errors, isValid } = validateRecipeInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newRecipe = new Recipe({
    userId: req.user,
    name: req.body.name,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    recipeImage: req.file.path
  });

  newRecipe.save()
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(err => {
      res.json(err);
    });
});


// Update a recipe
router.put("/update/:id", auth, (req, res, next) => {
  // Form validation
  const { errors, isValid } = validateRecipeInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
    if (err) return next(err);
    recipe.name = req.body.name,
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
router.put("/like/:id", auth, (req, res, next) => {
  Recipe.findOne({ _id: req.params.id })
  .then(recipe => {
    if (recipe.likes.filter(like => like.user.toString() === req.user).length > 0) {
      return res.json("You already liked the recipe");
    }
    
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
    .exec(function(err, recipe) {
      if (err) return next(err);
      res.json(recipe);
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