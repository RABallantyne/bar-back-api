exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("bars")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("bars").insert([
        { barName: "Flatiron Bar" },
        { barName: "Bobbys Bar" },
        { barName: "Sloshies" }
      ]);
    });
};
