const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorised = token === "xyz";
  if (isAdminAuthorised) {
    next();
  } else {
    res.status(401).send("Unauthorised access");
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorised = token === "xyz";
  if (isAdminAuthorised) {
    next();
  } else {
    res.status(401).send("Unauthorised access");
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
