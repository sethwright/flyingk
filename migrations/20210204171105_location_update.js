exports.up = function(knex) {
  return knex.schema.alterTable("locations", (table) => {
    table.text("type");

    table.text("address");

    table.text("city");

    table.text("state");

    table.text("telephone");

    table.text("fax");

    table.float("unleaded");

    table.float("midgrade");

    table.float("premium");

    table.float("diesel");

    table.float("propane");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("locations", (table) => {
    table.dropColumn("type");

    table.dropColumn("address");

    table.dropColumn("city");

    table.dropColumn("state");

    table.dropColumn("telephone");

    table.dropColumn("fax");

    table.dropColumn("unleaded");

    table.dropColumn("midgrade");

    table.dropColumn("premium");

    table.dropColumn("diesel");

    table.dropColumn("propane");
  });
};
