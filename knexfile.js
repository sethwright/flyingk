// Update with your config settings.

module.exports = {
  client: "pg",
  connection: {
    connectionString:
      process.env.DATABASE_URL ||
      `postgres://postgres:vizio1@127.0.0.1:5432/truckstop`,
    ssl: { rejectUnauthorized: false },
  },
  searchPath: "public",
  migrations: {
    directory: `${__dirname}/migrations`,
  },
};
