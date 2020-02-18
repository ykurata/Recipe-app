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

  // Estimated Time checks
  // Turn estimatedTime to String because Validator only accepts strings
  let timeString = data.estimatedTime.toString();
  if (Validator.isEmpty(data.estimatedTime)) {
    errors.estimatedTIme = "Estimated TIme is required";
  } else if (!Validator.isNumeric(timeString)) {
    errors.estimatedTime = "Please enter number";
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