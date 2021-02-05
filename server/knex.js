const knex = require("knex");

const db = knex({
  // this is configuration
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    `postgres://${process.env.DB_USER}:${process.env.DB_PW}@127.0.0.1:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  searchPath: "public",

  // migrations: {
  //   directory: `${__dirname}/migrations`,
  // },
});

module.exports = db;
