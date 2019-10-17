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
    return {
      bar: {
        relation: Model.BelongsToOneRelation,
        modelClass: Bar,
        join: {
          from: "products.bars_id",
          to: "bars.id"
        }
      },
      drink: {
        relation: Model.ManyToManyRelation,
        modelClass: Drink,
        join: {
          from: "products.bars_id",
          through: {
            from: "products_drinks.products_id",
            to: "products_drinks.drinks_id"
          },
          to: "drinks.id"
        }
      }
    };
  }
}

module.exports = { Product };
