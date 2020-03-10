const express = require("express");
const router = express.Router();
const multer = require("multer");

// Load input validation
const validateProfileInput = require("../validation/profile");

// import model and auth middleware
const Profile = require("../models/Profile");
const auth = require("./middleware/utils");
const upload = require("./service/upload");

// POST profile photo
router.post("/photo", upload.single("photo"), auth, (req, res, next) => {
  Profile.findOne({ userId: req.user }, (err, profile) => {
    if (err) return next(err);
    if (profile) {
      profile.photo = req.file.location;
      profile.save()
        .then(profile => {
          res.status(200).json(profile);
        })
        .catch(err => {
          res.status(400).json(err);
        })
    } else {
      const newProfile = new Profile({
        userId: req.user,
        photo: req.file.location
      });

      newProfile.save()
        .then(profile => {
          res.status(200).json(profile);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    }
  })
});


// create a profile 
router.post("/:id", auth, (req, res, next) => {
  // Form validation
  const { errors, isValid } = validateProfileInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ userId: req.params.id }, (err, profile) => {
    if (err) return next(err);
    if (profile) {
      profile.description = req.body.description

      profile.save()
        .then(profile => {
          res.status(200).json(profile);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    } else {
      const newProfile = new Profile({
        userId: req.user,
        description: req.body.description
      });

      newProfile.save()
        .then(profile => {
          res.status(200).json(profile);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    }
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

  Profile.findOne({ userId: req.params.id }, (err, profile) => {
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
  Profile.findOne({ userId: req.params.id })
  .populate("userId", "name")
  .exec((err, profile) => {
    if (err) return next(err);
    res.status(200).json(profile);
  });
});    


// DELETE a profile
router.delete("/delete/:id", auth, (req, res, next) => {
  Profile.remove({ _id: req.params.id}, function(err, profile) {
    if (err) return next(err);
    res.send(204);
  });
});

module.exports = router;