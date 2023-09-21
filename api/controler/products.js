const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile").development);

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await knex.select("*").from("products");
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new product
router.post("/", async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  try {
    const [productId] = await knex("products")
      .insert({ name, price })
      .returning("id");
    res.status(201).json({ id: productId, name, price });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
