const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  steps: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Recipe", RecipeSchema);