const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;
// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json());
// Import the products route module
const accountRoute = require("./controler/account");

// Use the products route
app.use("/", accountRoute);
app.use((req, res, next) => {
  res.end("");
});

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
