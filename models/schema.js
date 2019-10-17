const Knex = require("knex");
const connection = require("../knexfile");
const { Model } = require("objection");
const knexConnection = Knex(connection);
// const Product = require("./product");

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

class Menu extends Model {
  static get tableName() {
    return "menus";
  }
  static get relationMappings() {
    return {
      bar: {
        relation: Model.BelongsToOneRelation,
        modelClass: Bar,
        join: {
          from: "menus.bars_id",
          to: "bars.id"
        }
      },
      drinks: {
        relation: Model.HasManyRelation,
        modelClass: Drink,
        join: {
          from: "menus.id",
          to: "drinks.menus_id"
        }
      }
    };
  }
}

class Drink extends Model {
  static get tableName() {
    return "drinks";
  }
  static get relationMappings() {
    return {
      menu: {
        relation: Model.BelongsToOneRelation,
        modelClass: Menu,
        join: {
          from: "drinks.id",
          to: "menus.id"
        }
      },
      product: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
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

module.exports = { Bar, Menu, Drink, Product };
