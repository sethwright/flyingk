exports.up = function(knex) {
  return knex.schema.alterTable("locations", (table) => {
    table.text("highway");
    table.text("exit_num");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("locations", (table) => {
    table.dropColumn("highway");
    table.dropColumn("exit_num");
  });
};
