const express = require("express");
const { Bar, Product } = require("../models/schema");
const router = express.Router();

router.get("/", async (req, res) => {
  const bars = await Bar.query();
  res.json(bars);
});
