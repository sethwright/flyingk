// this file is configuration for connecting knex

const knex = require("knex");
const db = knex({
  client: "pg",
  connection: {
    connectionString:
      process.env.DATABASE_URL ||
      `postgres://postgres:vizio1@127.0.0.1:5432/truckstop`,
    // ssl: { rejectUnauthorized: false },
  },
  searchPath: "public",
  // migrations: {
  //   directory: `${__dirname}/migrations`,
  // },
});
module.exports = db;
