const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  console.log(req.body);
  res.send("Successfully logging the req!");
});

// app.get("/user", async (req, res) => {
//   try {
//     const userEmail = req.body.emailId;
//     const user = await User.findOne({ emailId: userEmail });
//     if (!user) {
//       res.status(404).send("User not found!");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("Users not found!");
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await User.findById("6733720b4db207be4762ddf0");
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const result = await User.findByIdAndDelete({ _id: userId });
    if (result == null) {
      res.send("User not found!");
    }
    res.send("User deleted successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong! " + err.message);
  }
});

app.patch("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  const data = req.body;

  try {
    await User.findOneAndUpdate({ emailId: userEmail }, data);
    res.send("User updated successfully!");
  } catch (err) {
    res.send("Something went wrong!");
  }
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
