const express = require("express");
const { Bar, Product } = require("../models/schema");
const router = express.Router();

router.get("/", async (req, res) => {
  const bars = await Bar.query();
  res.json(bars);
});

router.get("/:id", async (req, res) => {
  const bar = await Bar.query()
    .findById(req.params.id)
    .eager("products");
  res.json(bar);
});

router.post("/", async (req, res) => {
  const newBar = req.body;

  const bar = await Bar.query()
    .allowInsert("[barName]")
    .insert(newBar);
  res.send(bar);
});

router.get("/:id/products", async (req, res) => {
  const bar = await Bar.query().findById(req.params.id);

  await bar.$relatedQuery("products");

  res.send(bar.products);
});

router.post("/:id/products", async (req, res) => {
  const bar = await Bar.query().findById(req.params.id);

  await bar
    .$relatedQuery("products")
    .allowInsert("[productName, category, price]")
    .insert(req.body);
  res.send(bar);
});

router.patch("/:id/products/:productId", async (req, res) => {
  const product = await Product.query().patchAndFetchById(
    req.params.productId,
    req.body
  );
  res.send(product);
});

router.delete("/:id", async (req, res) => {
  await Bar.query().deleteById(req.params.id);
  res.redirect("/bars");
});

router.delete("/:id/products/:productId", async (req, res) => {
  await Product.query().deleteById(req.params.productId);
  res.redirect(`/bars/${req.params.id}`);
});

module.exports = router;
