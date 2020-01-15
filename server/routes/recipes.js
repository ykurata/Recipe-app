const express = require("express");
const router = express.Router();
const multer = require("multer");

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
  console.log(req.file);
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