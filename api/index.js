const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;
// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json());
// Import the products route module
const accountRoute = require("./controler/account");
const users = require("./cache/user");
const { secretKey } = require("./const");
const db = require("./db/database");

// Use the products route
app.use((req, res, next) => {
  const token = req.header("Authorization"); // Assuming the token is sent in the Authorization header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token is invalid" });
    }

    const userId = decoded.userId;

    // Check if the user is cached in memory
    if (userCache[userId]) {
      req.user = userCache[userId];
      return next();
    }

    // Use the modified SQL query to fetch user info and roles
    db.raw(
      `WITH UserRoles AS (
        SELECT
          ur.user_id,
          ARRAY_AGG(r.name) AS role_names
        FROM user_role AS ur
        JOIN role AS r ON ur.role_id = r.id
        GROUP BY ur.user_id
      )
      SELECT
        u.id AS user_id,
        u.username,
        u.email,
        u.password,
        -- Include other user columns here
        ur.role_names
      FROM users AS u
      LEFT JOIN UserRoles AS ur ON u.id = ur.user_id
      WHERE u.id = ${userId}`
    )
      .then((results) => {
        const userWithRoles = results.rows[0]; // Assumes the query returns a single row
        if (!userWithRoles) {
          return res.status(404).json({ message: "User not found" });
        }

        // Cache the user in memory
        userCache[userId] = userWithRoles;

        req.user = userWithRoles;
        next();
      })
      .catch((dbErr) => {
        return next(dbErr);
      });
  });
});
app.use("/api", accountRoute);
app.use((req, res, next) => {
  res.end("");
});

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
