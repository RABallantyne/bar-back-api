exports.up = function(knex) {
  return knex.schema.createTable("products_drinks", table => {
    table.increments("id").primary();
    table.string("quantity");
    table.integer("products_id").references("products.id");
    table.integer("drinks_id").references("drinks.id");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("products_drinks");
};
