const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  }
};

const validateLoginData = (req) => {
  const { emailId } = req.body;
  if (!validator.isEmail(emailId)) {
    throw new Error("Please enter a valid emailId");
  }
};

module.exports = {
  validateSignUpData,
  validateLoginData,
};
