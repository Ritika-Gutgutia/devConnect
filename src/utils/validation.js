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

const validateProfileData = (req) => {
  try {
    const data = req.body;
    const allowedEditFields = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "photoUrl",
      "about",
      "skills",
    ];
    const isAllowed = Object.keys(data).every((k) => {
      return allowedEditFields.includes(k);
    });

    if (!isAllowed) {
      throw new Error("Invalid Edit request");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = {
  validateSignUpData,
  validateLoginData,
  validateProfileData,
};
