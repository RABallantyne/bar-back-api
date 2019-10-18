const Knex = require("knex");
const connection = require("../knexfile");
const { Model } = require("objection");
const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Product extends Model {
  static get tableName() {
    return "products";
  }
  static get relationMappings() {
    const Bar = require("./bar");
    const Drink = require("./drink");
    return {
      bar: {
        relation: Model.BelongsToOneRelation,
        modelClass: Bar,
        join: {
          from: "products.bars_id",
          to: "bars.id"
        }
      },
      drinks: {
        relation: Model.ManyToManyRelation,
        modelClass: Drink,
        join: {
          from: "products.id",
          through: {
            from: "products_drinks.products_id",
            to: "products_drinks.drinks_id",
            extra: ["quantity"]
          },
          to: "drinks.id"
        }
      }
    };
  }
}

module.exports = Product;
