exports.up = function(knex) {
  return knex.schema.createTable("products", table => {
    table.increments("id").primary();
    table.string("productName");
    table.string("category");
    table.integer("price");
    table.integer("bars_id").references("bars.id");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("products");
};
