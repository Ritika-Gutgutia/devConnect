const express = require("express");
const app = express();

app.get("/user/details", (req, res) => {
  try {
    throw new Error("Some error encountered");
  } catch (err) {
    console.log(err.message, "Error");
    res.status(500).send("Error encountered");
  }
});

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     console.log(err);
//     res.send("Error, please contact the support team!");
//   }
// });
app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
