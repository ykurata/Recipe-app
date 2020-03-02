const express = require("express");
const router = express.Router();
const multer = require("multer");

// Load input validation
const validateProfileInput = require("../validation/profile");

// import model and auth middleware
const Profile = require("../models/Profile");
const auth = require("./middleware/utils");


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './avatar/');
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


// POST profile photo
router.post("/photo", upload.single("photo"), auth, (req, res, next) => {
  console.log(req.file);
  Profile.findOne({ userId: req.user }, (profile, err) => {
    if (err) return next(err);
    if (profile) {
      profile.photo = req.file.path;
      profile.save()
        .then(profile => {
          res.status(200).json(profile);
        })
        .catch(err => {
          res.status(400).json(err);
        })
    } else {
      const newProfile = new Profile({
        photo: req.file.path
      })

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

  Profile.findOne({ userId: req.user }, (err, profile) => {
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

  Profile.findOne({ userId: req.user }, (err, profile) => {
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
  Profile.findOne({ userId: req.user })
  .populate("userId", "name")
  .exec((err, profile) => {
    if (err) return next(err);
    res.status(200).json(profile);
  });
});    


// DELETE a profile
// Delete a recipe
router.delete("/delete/:id", auth, (req, res, next) => {
  Profile.remove({ _id: req.params.id}, function(err, profile) {
    if (err) return next(err);
    res.send(204);
  });
});

module.exports = router;