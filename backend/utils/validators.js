const validator = require("validator");

// ── Validate signup input ──
const validateSignup = ({ firstName, lastName, email, password }) => {
  const errors = {};

  if (!firstName || firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  if (!lastName || lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  if (!email || !validator.isEmail(email)) {
    errors.email = "Please provide a valid email address";
  }

  if (!password || password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  // password strength: at least one letter and one number
  if (password && !/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
    errors.password = "Password must contain at least one letter and one number";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// ── Validate login input ──
const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!email || !validator.isEmail(email)) {
    errors.email = "Please provide a valid email address";
  }

  if (!password || password.trim() === "") {
    errors.password = "Password is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

module.exports = { validateSignup, validateLogin };