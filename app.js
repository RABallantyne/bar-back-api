const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bars = require("./controllers/bars");
require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use("/bars", bars);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
