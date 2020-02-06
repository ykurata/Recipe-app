const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRecipeInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.ingredients = !isEmpty(data.ingredients) ? data.ingredients : "";
  data.steps = !isEmpty(data.steps) ? data.steps : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Recipe Title is required";
  }

  // Ingredients checks
  if (Validator.isEmpty(data.ingredients)) {
    errors.ingredients = "Ingredients are required";
  }

  // Steps checks
  if (Validator.isEmpty(data.steps)) {
    errors.steps = "Steps are required";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};