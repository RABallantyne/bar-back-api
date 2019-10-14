exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("bars")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("bars").insert([
        { barName: "Bar One" },
        { barName: "Bar Two" },
        { barName: "Bar Three" }
      ]);
    });
};
