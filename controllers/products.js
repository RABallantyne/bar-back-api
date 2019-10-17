const express = require("express");
const { Product } = require("../models/product");
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

module.exports = router;
