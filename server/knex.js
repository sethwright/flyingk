const knex = require("knex");
const db = knex({
  // this is configuration
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
