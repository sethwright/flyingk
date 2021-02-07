// Update with your config settings.

module.exports = {
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    `postgres://postgres:vizio1@127.0.0.1:5432/truckstop`,
  searchPath: "public",

  migrations: {
    directory: `${__dirname}/migrations`,
  },
};
