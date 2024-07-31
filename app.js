const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const authMiddleware = require("./middleware/authmiddleware");
const userRoutes = require("./routes/userroutes");
const profileRoutes = require("./routes/profileRoutes");
const postRoutes = require("./routes/postRoutes");
const followRoutes = require("./routes/followRoutes");
const commentRoutes = require("./routes/commentsandLikesRoutes");
const searchRoutes = require("./routes/searchRoutes");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// connecting with mongodb using atlas

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);

const uri = `mongodb+srv://${username}:${password}@mydatabase.mjjh1kv.mongodb.net/`;

mongoose
  .connect(uri, { dbName: "social" })
  .then(() => {
    console.log("Connection Initialized");
  })
  .catch((err) => {
    console.log(`ERROR:${err}`);
  });
mongoose.connection.on("connected", () => {
  console.log("Database Connected");
});
// Basic route
app.get("/ping", (req, res) => {
  res.status(200).send({ message: "Server is working" });
});
// Importing user routes

app.use("/api/auth", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api", followRoutes);
app.use("/api", commentRoutes);
app.use("/", searchRoutes);

app.listen(port, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + port
    );
  else console.log("Error occurred, server can't start", error);
});
