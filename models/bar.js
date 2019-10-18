const Knex = require("knex");
const connection = require("../knexfile");
const { Model } = require("objection");
const knexConnection = Knex(connection);

Model.knex(knexConnection);
class Bar extends Model {
  static get tableName() {
    return "bars";
  }
  static get relationMappings() {
    const Product = require("./product");
    const Menu = require("./menu");
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: "bars.id",
          to: "products.bars_id"
        }
      },
      menus: {
        relation: Model.HasManyRelation,
        modelClass: Menu,
        join: {
          from: "bars.id",
          to: "menus.bars_id"
        }
      }
    };
  }
}

module.exports = Bar;
