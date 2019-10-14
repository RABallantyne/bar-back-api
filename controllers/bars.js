const express = require("express");
const { Bar, Product } = require("../models/schema");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.query();
  res.json(products);
});
