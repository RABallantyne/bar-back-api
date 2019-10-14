require("dotenv").config();
const pg = require("pg");

module.exports = {
  client: "pg",
  connection: `${process.env.DATABASE_URL}?ssl=true`
};
