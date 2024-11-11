const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth.js");

app.get("/admin/getAllData", adminAuth, (req, res) => {
  res.send("Get all data");
});

app.post("/user/login", (req, res) => {
  res.send("User logged in successfully!");
});

app.get("/user/order-details", userAuth, (req, res) => {
  res.send("Order details sent successfully!");
});
app.post("/admin/deleteUser", adminAuth, (req, res) => {
  res.send("User deleted successfully!");
});
app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
