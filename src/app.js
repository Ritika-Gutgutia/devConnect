const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());
app.post("/signup", async (req, res) => {
  //   const user = new User({
  //     firstName: "Peyush",
  //     lastName: "Bansal",
  //     emailId: "peyushbansal@email.com",
  //     password: "1234",
  //     age: 35,
  //     gender: "male",
  //   });
  //   try {
  //     await user.save();
  //     res.send("User added successfully!");
  //   } catch (err) {
  //     res.status(400).send("Error saving the user " + err.message);
  //   }
  const user = new User(req.body);
  await user.save();
  console.log(req.body);
  res.send("Successfully logging the req!");
});
connectDB()
  .then(() => {
    console.log("Cluster connection established...");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.log("Error in connecting to the cluster");
  });
