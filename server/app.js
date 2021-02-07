const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("./knex");

const app = express();

// Setup Logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "dist")));

app.get("/api/locations", async (req, res) => {
  try {
    const locations = await db.select().table("locations");
    res.json(locations);
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

app.get("/api/services", async (req, res) => {
  try {
    const services = await db.select().table("services");
    res.json(services);
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

app.get("/api/services/locations", async (req, res) => {
  try {
    const allServices = await db("locations")
      .innerJoin(
        "locations_services",
        "locations.id",
        "locations_services.location_id"
      )
      .innerJoin("services", "locations_services.service_id", "services.id");
    res.json(allServices);
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/location/:id/services", async (req, res) => {
  try {
    const allServices = await db("services").whereIn(
      "id",
      db("locations_services")
        .select("service_id")
        .where("location_id", req.params.id)
    );
    res.json(allServices);
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/service/:name/locations", async (req, res) => {
  const splitReqs = req.params.name.split("&");
  const serviceLocations = await db
    .from("locations")
    .innerJoin(
      "locations_services",
      "locations.id",
      "locations_services.location_id"
    )
    .innerJoin("services", "locations_services.service_id", "services.id")
    .where("servicename", splitReqs);
  res.json(serviceLocations);
});

app.get("/api/:type/service/:name/locations", async (req, res) => {
  const serviceLocations = await db
    .from("locations")
    .innerJoin(
      "locations_services",
      "locations.id",
      "locations_services.location_id"
    )
    .innerJoin("services", "locations_services.service_id", "services.id")
    .where("servicename", req.params.name);
  res.json(serviceLocations);
});

// Always return the main index.html, since we are developing a single page application
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "dist", "index.html"));
});

module.exports = app;
