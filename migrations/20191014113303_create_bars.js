exports.up = function(knex) {
  return knex.schema.createTable("bars", table => {
    table.increments("id").primary();
    table.string("barName");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("bars");
};
