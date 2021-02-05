exports.up = function(knex) {
  return knex.schema.createTable("services", (table) => {
    table.increments().index();

    table.text("serviceType");

    table.text("serviceName");

    table.text("img");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("services");
};
