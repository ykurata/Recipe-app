const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.description = !isEmpty(data.description) ? data.description : "";

  // description checks
  if (Validator.isEmpty(data.description)) {
    errors.description = "Please enter about yourself";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};