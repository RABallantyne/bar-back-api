exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("products_drinks")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products_drinks").insert([
        { products_id: 27, drinks_id: 1, quantity: "1 oz" },
        { products_id: 26, drinks_id: 1, quantity: ".5 oz" }
      ]);
    });
};
