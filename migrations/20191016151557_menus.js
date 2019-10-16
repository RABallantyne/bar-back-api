exports.up = function(knex) {
  return knex.schema.createTable("menus", table => {
    table.increments("id").primary();
    table.string("menuName");
    table.string("menuNote");
    table.integer("bars_id").references("bars.id");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("menus");
};
