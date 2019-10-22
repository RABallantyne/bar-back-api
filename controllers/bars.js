const express = require("express");
const Bar = require("../models/bar");
const Menu = require("../models/menu");
const Product = require("../models/product");
const Drink = require("../models/drink");
const router = express.Router();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const cors = require("cors");
const ProductDrink = require("../models/ProductDrink");

router.use(cors());

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

router.delete("/:id", checkJwt, async (req, res) => {
  await Bar.query().deleteById(req.params.id);
  res.redirect("/bars");
});

router.get("/:id/products", checkJwt, async (req, res) => {
  const bar = await Bar.query().findById(req.params.id);

  await bar.$relatedQuery("products");

  res.send(bar.products);
});

router.post("/:id/products", checkJwt, async (req, res) => {
  const bar = await Bar.query().findById(req.params.id);

  await bar
    .$relatedQuery("products")
    .allowInsert("[productName, category, price]")
    .insert(req.body);
  res.send(bar);
});

router.patch("/:id/products/:productId", checkJwt, async (req, res) => {
  const product = await Product.query().patchAndFetchById(
    req.params.productId,
    req.body
  );
  res.send(product);
});

router.delete("/:id/products/:productId", checkJwt, async (req, res) => {
  await Product.query().deleteById(req.params.productId);
  res.redirect(`/bars/${req.params.id}`);
});

router.get("/:id/menus", checkJwt, async (req, res) => {
  const bar = await Bar.query().findById(req.params.id);

  await bar.$relatedQuery("menus");

  res.send(bar.menus);
});

router.post("/:id/menus", checkJwt, async (req, res) => {
  const bar = await Bar.query().findById(req.params.id);

  await bar
    .$relatedQuery("menus")
    .allowInsert("[menuName, menuNote]")
    .insert(req.body);
  res.send(bar);
});

router.get("/:id/menus/:id/", checkJwt, async (req, res) => {
  const menu = await Menu.query().findById(req.params.id);

  await menu.$relatedQuery("drinks");

  res.send(menu);
});

router.get("/:barId/menus/:id/drinks/:drinkId", checkJwt, async (req, res) => {
  const drink = await Drink.query()
    .findById(req.params.drinkId)

    .eager("[products_drinks, products]");
  // await drink.$relatedQuery("products_drinks");

  res.json(drink);
});

router.patch(
  "/:barId/menus/:id/drinks/:drinkId",
  checkJwt,
  async (req, res) => {
    const drink = await Drink.query().patchAndFetchById(
      req.params.drinkId,
      req.body
    );
    res.send(drink);
  }
);

router.post("/:id/menus/:id/drinks", checkJwt, async (req, res) => {
  const menu = await Menu.query().findById(req.params.id);

  await menu
    .$relatedQuery("drinks")
    .allowInsert("[drinkName, drinkNote, margin]")
    .insert(req.body);
  res.send(menu);
});
//unfuck this!
router.post("/:id/menus/:id/drinks/:drinkId", checkJwt, async (req, res) => {
  // console.log("hit");
  const drink = await Drink.query().findById(req.params.drinkId);
  // const product = await Product.query().findById(req.body.products_id);

  await drink
    .$relatedQuery("products_drinks")
    .insert({ products_id: req.body.products_id, quantity: req.body.quantity });

  res.send(drink);
});

router.delete(
  "/:id/menus/:id/drinks/:drinkId/:productdrinkId",
  checkJwt,
  async (req, res) => {
    // console.log("hit");
    const productdrink = await ProductDrink.query().deleteById(
      req.params.productdrinkId
    );

    res.json(productdrink);
  }
);

module.exports = router;
