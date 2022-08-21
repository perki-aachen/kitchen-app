const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ path: "./config.env" });

// Defining PORT and Start app
let PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Connect to Database URI
const URI = process.env.ATLAS_URI;
mongoose.connect(URI);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully!");
});

// Add Routes
// app.use(require("./routes/ingredients"));
const ingredientsRouter = require("./routes/ingredients");

app.use("/api/ingredients", ingredientsRouter);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${PORT}`);
});
