exports.up = function(knex) {
  return knex.schema.createTable("services", (table) => {
    table.increments().index();

    table.text("servicetype");

    table.text("servicename");

    table.text("img");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("services");
};
