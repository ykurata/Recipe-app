const express = require("express");
const router = express.Router();

// Load input validation
const validateProfileInput = require("../validation/profile");

// import model and auth middleware
const Profile = require("../models/Profile");
const auth = require("./middleware/utils");

// create a profile 
router.post("/", auth, (req, res, next) => {
  // Form validation
  const { errors, isValid } = validateProfileInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newProfile = new Profile({
    userId: req.user,
    description: req.body.description
  });

  newProfile.save()
    .then(profile => {
      res.status(200).json(profile);
    })// Delete a recipe
    router.delete("/delete/:id", auth, (req, res, next) => {
      Recipe.remove({ _id: req.params.id}, (err, recipe) => {
        if (err) return next(err);
        res.json({ message: "Successfully deleted" });
      })
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// update a profile
router.put("/update/:id", auth, (req, res, next) => {
  // Form validation
  const { errors, isValid } = validateProfileInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ _id: req.params.id }, (err, profile) => {
    if (err) return next(err);
    profile.description = req.body.description;

    profile.save()
      .then(profile => {
        res.status(200).json(profile);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
});


// GET all profiles 
router.get("/all", auth, (req, res, next) => {
  Profile.find({})
  .populate("userId", "name")
  .exec(function(err, profile){
    if (err) return next(err);
    res.status(200).json(profile);
  });
});


// GET a specific profile
router.get("/:id", auth, (req, res, next) => {
  Profile.find({ _id: req.params.id })
  .populate("userId", "name")
  .exec((err, recipe) => {
    if (err) return next(err);
    res.status(200).json(recipe);
  });
});    


// DELETE a profile
// Delete a recipe
router.delete("/delete/:id", auth, (req, res, next) => {
  Profile.remove({ _id: req.params.id}, (err, profile) => {
    if (err) return next(err);
    res.status(200).json({ message: "Successfully deleted" });
  });
});

module.exports = router;