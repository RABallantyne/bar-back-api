const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bars = require("./controllers/bars");
require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(cors());
app.use("/bars", bars);

const port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(app.get("port"), () => {
  console.log(`Listening on port ${port}...`);
});
