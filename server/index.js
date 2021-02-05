require("dotenv").config();
const app = require("./app");
const db = require("./knex");
const seeder = require("../data/import");

const PORT = process.env.PORT || 9000;

(async () => {
  try {
    console.log("Running migrations : Deleting tables");
    await db.migrate.rollback();
    console.log("Running migrations : Creating tables");
    await db.migrate.latest();
    console.log("Running migrations : Injecting data");
    await seeder();

    console.log("Starting express");
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
})();
