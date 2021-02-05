exports.up = function(knex) {
  return knex.schema.createTable("locations_services", (table) => {
    table.increments().index();

    table
      .integer("locationID")
      .references("id")
      .inTable("locations");

    table
      .integer("serviceID")
      .references("id")
      .inTable("services");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("locations_services");
};
