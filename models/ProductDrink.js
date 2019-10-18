const Knex = require("knex");
const connection = require("../knexfile");
const { Model } = require("objection");
const knexConnection = Knex(connection);

Model.knex(knexConnection);

class ProductDrink extends Model {
  static get tableName() {
    return "products_drinks";
  }
  static get relationMappings() {
    const Product = require("./product");
    const Drink = require("./drink");
    return {
      product: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: "products_drinks.id",
          to: "drinks.menus_id"
        }
      },
      drink: {
        relation: Model.HasManyRelation,
        modelClass: Drink,
        join: {
          from: "products_drinks.id",
          to: "products.bars_id"
        }
      }
    };
  }
}

module.exports = ProductDrink;
