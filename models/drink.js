const Knex = require("knex");
const connection = require("../knexfile");
const { Model } = require("objection");
const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Drink extends Model {
  static get tableName() {
    return "drinks";
  }
  static get relationMappings() {
    const Menu = require("./menu");
    const Product = require("./product");
    return {
      menu: {
        relation: Model.BelongsToOneRelation,
        modelClass: Menu,
        join: {
          from: "drinks.menus_id",
          to: "menus.bars_id"
        }
      },
      product: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: "drinks.menus_id",
          through: {
            from: "products_drinks.drink_id",
            to: "products_drinks.product_id",
            extra: ["quantity"]
          },
          to: "products.bars_id"
        }
      }
    };
  }
}

module.exports = Drink;
