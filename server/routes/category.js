const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const auth = require("./middleware/utils");

// input validation
const validateCategoryInput = require("../validation/category");

// Create a category
router.post("/", auth, async (req, res) => {
  // Form validation
  const { errors, isValid } = validateCategoryInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const newCategory = new Category({
      title: req.body.title,
    });
    const category = await newCategory.save();
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
