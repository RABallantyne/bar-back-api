const Knex = require("knex");
const connection = require("../knexfile");
const { Model } = require("objection");
const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Menu extends Model {
  static get tableName() {
    return "menus";
  }
  static get relationMappings() {
    const Bar = require("./bar");
    const Drink = require("./drink");
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

module.exports = Menu;
