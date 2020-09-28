const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";

  // description checks
  if (Validator.isEmpty(data.title)) {
    errors.title = "Enter the category name";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
