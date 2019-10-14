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
      }
    };
  }
}

class Bar extends Model {
  static get tableName() {
    return "bars";
  }
  static get relationMappings() {
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: "bars.id",
          to: "products.bars_id"
        }
      }
    };
  }
}

module.exports = { Bar, Product };
