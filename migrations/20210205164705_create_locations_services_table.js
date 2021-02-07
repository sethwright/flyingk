exports.up = function(knex) {
  return knex.schema.createTable("locations_services", (table) => {
    table.increments().index();

    table
      .integer("location_id")
      .references("id")
      .inTable("locations");

    table
      .integer("service_id")
      .references("id")
      .inTable("services");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("locations_services");
};
