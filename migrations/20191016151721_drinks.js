exports.up = function(knex) {
  return knex.schema.createTable("drinks", table => {
    table.increments("id").primary();
    table.string("drinkName");
    table.string("drinkNote");
    table.integer("menus_id").references("menus.id");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("drinks");
};
