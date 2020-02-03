const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecipeSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }, 
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
    },
    recipeImage: {
      type: String
    }
  },
  {
    timestamps: { createdAt: true }
  }
);

module.exports = mongoose.model("Recipe", RecipeSchema);