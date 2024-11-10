const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Ritika", lastName: "Gutgutia" });
});

app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Ritika", lastName: "Gutgutia" });
});

app.get("/a(bd)?c", (req, res) => {
  res.send("Hello hello hello");
});

app.get("/a*c", (req, res) => {
  res.send("Hello hello hello");
});

app.get("/a+c", (req, res) => {
  res.send("Hello hello hello");
});

app.get(/a/, (req, res) => {
  res.send("Hello hello hello regex");
});

app.get(/.*fly$/, (req, res) => {
  res.send("Hello hello hello regex");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
