const express = require("express");
const router = express.Router();
// index.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/database");
const { secretKey } = require("../const");

router.get("/", async (req, res) => {
  res.send(
    "api list:<br>/testname {username} => { error?, message? }<br>/register { username, email, password }<br>/login { username, password }<br>"
  );
});

router.post("/testname", async (req, res) => {
  try {
    const { username } = req.body;

    // Check if the user already exists
    const existingUser = await db("users").where({ username }).first();

    if (existingUser) {
      return res.json({ error: "Name already exists" });
    }

    res.json({ message: "OK" });
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error", data: error });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await db("users").where({ username }).first();

    if (existingUser) {
      return res.json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    await db("users").insert({
      username,
      email,
      password: hashedPassword,
    });

    res.json({ message: "OK" });
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Retrieve user from the database based on username
  const user = await db("users").where({ username }).first();

  if (!user) {
    return res.json({ error: "Invalid username or password" });
  }

  // Compare the hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.json({ error: "Invalid username or password" });
  }

  // Create a JWT token
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "7d" });

  // Send the token in the response
  res.status(200).json({ token });
});

module.exports = router;
