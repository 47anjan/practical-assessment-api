const validate = require("validator");

const signupValidation = (req) => {
  const { email, password, phone, name } = req.body;

  if (!name) {
    throw new Error("Name cant be empty");
  }
  if (!validate.isMobilePhone(phone)) {
    throw new Error("Invalid phone number format");
  }

  if (!validate.isEmail(email)) {
    throw new Error("Invalid email format");
  }

  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
};

module.exports = signupValidation;
