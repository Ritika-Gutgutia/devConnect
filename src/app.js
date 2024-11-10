const express = require("express");
const app = express();

// app.use("/test", (req, res) => {
//   res.send("Hello from the server, testingggg modee!");
// });

// app.use("/", (req, res) => {
//   res.send("Hello from the server");
// });

// app.use("/test/2", (req, res) => {
//   res.send("Abracadabra");
// });

// app.use((req, res) => {
//   res.send("Hello from the server");
// });

// app.use("/user", (req, res) => {
//   res.send("HAHAHAHAHHAAHAAAHHAHAHAHAHAHAHAHAAAAAAAAAAAA");
// });

app.get("/user", (req, res) => {
  res.send({ firstName: "Ritika", lastName: "Gutgutia" });
});

app.post("/user", (req, res) => {
  console.log("Data saved successfully to the DB");
  res.send("Data saved successfully to the DB");
});

app.put("/user", (req, res) => {
  console.log("Data successfully updated");
  res.send("Data updated successfully to the DB");
});

app.patch("/user", (req, res) => {
  console.log("Data updated successfully to the DB");
  res.send("Data updated successfully to the DB");
});

app.delete("/user", (req, res) => {
  console.log("Data deleted successfully from the DB");
  res.send("Data deleted successfully from the DB");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
