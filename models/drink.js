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
    const ProductDrink = require("./ProductDrink");
    return {
      menu: {
        relation: Model.BelongsToOneRelation,
        modelClass: Menu,
        join: {
          from: "drinks.menus_id",
          to: "menus.bars_id"
        }
      },
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: "drinks.id",
          through: {
            from: "products_drinks.drinks_id",
            to: "products_drinks.products_id",
            extra: ["quantity"]
          },
          to: "products.id"
        }
      },
      products_drinks: {
        relation: Model.HasManyRelation,
        modelClass: ProductDrink,
        join: {
          from: "drinks.id",
          to: "products_drinks.drinks_id"
        }
      }
    };
  }
}

module.exports = Drink;
