const fs = require("fs");
const db = require("../server/knex.js");

// const hashMap = {}; // cache

module.exports = async () => {
  try {
    //const locations = JSON.parse(fs.readFileSync("../data/locations.json"));
    const locations = JSON.parse(
      fs.readFileSync(`${__dirname}/locations.json`)
    );
    const servicesCache = {};

    for (const location of locations) {
      // ADDING TO LOCATION TABLE
      const id = location.Site.SiteId;
      const name = location.Name;
      const type = location.FacilitySubtype.Name;
      const longitude = location.Site.Longitude;
      const latitude = location.Site.Latitude;
      const address = location.Addresses[0].Address1;
      const state = location.Addresses[0].State;
      const city = location.Addresses[0].City;
      const highway = location.Site.Highway;
      const exit_num = location.Site.ExitNumber;
      let telephone;
      let fax;
      let unleaded;
      let midgrade;
      let premium;
      let diesel;
      let propane;

      // Acquiring unleaded, midgrade, premium, diesel, propane details.
      location.Site.FuelPrices.forEach((gas) => {
        if (gas.DisplayName !== undefined) {
          switch (gas.DisplayName) {
            case "UNLEADED":
              unleaded = gas.CashPrice;
              break;

            case "MIDGRADE":
              midgrade = gas.CashPrice;
              break;

            case "PREMIUM":
              premium = gas.CashPrice;
              break;

            case "DIESEL":
            case "DIESEL B5":
            case "DIESEL B15":
              diesel = gas.CashPrice;
              break;

            case "PROPANE":
              propane = gas.CashPrice;
              break;

            default:
              break;
          }
        }
      });

      const location_id = id;

      // Acquiring contact details.

      for (let contact of location.ContactMethods) {
        if (contact.Type.Name === "Fax") {
          fax = contact.Data;
        } else if (contact.Type.Name === "Main Phone") {
          telephone = contact.Data;
        }
      }

      await db("locations").insert({
        id,
        name,
        type,
        latitude,
        longitude,
        address,
        city,
        state,
        telephone,
        fax,
        unleaded,
        midgrade,
        premium,
        diesel,
        propane,
        highway,
        exit_num,
      });

      //ADDIN TO SERVICES TABLE Check services. Loop through 'ADDITIONAL AMENITIES', 'CUSTOM FIELDS' and 'site.concepts' if service exists, skip. If not, assign value.
      let servicetype;
      let servicename;
      let img;

      for (let service of location.AdditionalAmenities) {
        servicetype = "Amenity";
        servicename = service.SiteManagementItem.Title;
        img = undefined;
        if (!servicesCache[servicename]) {
          servicesCache[servicename] = servicename;
          // if service is undefined in PSQL, add to services table:
          await db("services").insert({
            servicetype,
            servicename,
            img,
          });
        }
        const service_return = await db
          .from("services")
          .select("id")
          .where("servicename", servicename);

        const service_id = service_return[0].id;

        await db("locations_services").insert({
          location_id,
          service_id,
        });
      }

      for (let service of location.CustomFields) {
        servicetype = "Others";
        servicename = service.CustomField.Label;
        img = service.CustomField.FacilityLogo;

        if (!servicesCache[servicename]) {
          servicesCache[servicename] = servicename;
          await db("services").insert({
            servicetype,
            servicename,
            img,
          });
        }
        const service_return = await db
          .from("services")
          .select("id")
          .where("servicename", servicename);

        const service_id = service_return[0].id;
        await db("locations_services").insert({
          location_id,
          service_id,
        });
      }

      for (let concept of location.Site.Concepts) {
        servicetype = "Restaurant";
        servicename = concept.Concept.Name;
        img = concept.Concept.ConceptIcon;

        if (!servicesCache[servicename]) {
          servicesCache[servicename] = servicename;
          await db("services").insert({
            servicetype,
            servicename,
            img,
          });
        }
        const service_return = await db
          .from("services")
          .select("id")
          .where("servicename", servicename);

        const service_id = service_return[0].id;
        await db("locations_services").insert({
          location_id,
          service_id,
        });
      }
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
};
