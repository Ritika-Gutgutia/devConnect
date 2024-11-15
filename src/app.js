const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());
app.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    if (data?.skills?.length > 10) {
      console.log("Length issue");
      throw new Error("User cannot be signed up!");
    }
    const user = new User(data);
    await user.save();
    console.log(req.body);
    res.send("Successfully logging the req!");
  } catch (err) {
    res.send("Error in signing the user " + err.message);
  }
});

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

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["age", "photoUrl", "gender", "about", "skills"];

    const isAllowed = Object.keys(data).every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });

    if (!isAllowed || data?.skills.length > 10) {
      throw new Error("Update cannot be made");
    }
    await User.findOneAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated successfully!");
  } catch (err) {
    res.send("Something went wrong! " + err.message);
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
    console.log("Error in connecting to the cluster " + err.message);
  });
