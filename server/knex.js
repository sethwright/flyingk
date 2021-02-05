const knex = require("knex");

const db = knex({
  // this is configuration
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    `postgres://${process.env.USER}@127.0.0.1:5432/truckstop`,
  searchPath: "public",

  // migrations: {
  //   directory: `${__dirname}/migrations`,
  // },
});

module.exports = db;
