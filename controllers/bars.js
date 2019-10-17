const express = require("express");
const { Bar, Product, Menu, Drink } = require("../models/schema");
const router = express.Router();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

router.get("/", async (req, res) => {
  const bars = await Bar.query();
  res.json(bars);
});

router.get("/:id", checkJwt, async (req, res) => {
  const bar = await Bar.query()
    .findById(req.params.id)
    .eager("[products, menus]");
  res.json(bar);
});

router.post("/", checkJwt, async (req, res) => {
  const newBar = req.body;

  const bar = await Bar.query()
    .allowInsert("[barName]")
    .insert(newBar);
  res.send(bar);
});

router.get("/:id/products", checkJwt, async (req, res) => {
  const bar = await Bar.query().findById(req.params.id);

  await bar.$relatedQuery("products");

  res.send(bar.products);
});

router.get("/:id/menus", checkJwt, async (req, res) => {
  const bar = await Bar.query().findById(req.params.id);

  await bar.$relatedQuery("menus");

  res.send(bar.menus);
});

router.get("/:id/menus/:id/drinks", checkJwt, async (req, res) => {
  const menu = await Menu.query().findById(req.params.id);

  await menu.$relatedQuery("drinks");

  res.send(menu.drinks);
});

router.post("/:id/products", checkJwt, async (req, res) => {
  const bar = await Bar.query().findById(req.params.id);

  await bar
    .$relatedQuery("products")
    .allowInsert("[productName, category, price]")
    .insert(req.body);
  res.send(bar);
});

router.post("/:id/menus", checkJwt, async (req, res) => {
  const bar = await Bar.query().findById(req.params.id);

  await bar
    .$relatedQuery("menus")
    .allowInsert("[menuName, menuNote]")
    .insert(req.body);
  res.send(bar);
});

router.post("/:id/menus/:id/drinks", checkJwt, async (req, res) => {
  const menu = await Menu.query().findById(req.params.id);

  await menu
    .$relatedQuery("drink")
    .allowInsert("[drinkName, drinkNote]")
    .insert(req.body);
  res.send(menu);
});

router.patch("/:id/products/:productId", checkJwt, async (req, res) => {
  const product = await Product.query().patchAndFetchById(
    req.params.productId,
    req.body
  );
  res.send(product);
});

router.delete("/:id", checkJwt, async (req, res) => {
  await Bar.query().deleteById(req.params.id);
  res.redirect("/bars");
});

router.delete("/:id/products/:productId", checkJwt, async (req, res) => {
  await Product.query().deleteById(req.params.productId);
  res.redirect(`/bars/${req.params.id}`);
});

module.exports = router;
