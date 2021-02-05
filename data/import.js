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
      });

      //ADDIN TO SERVICES TABLE Check services. Loop through 'ADDITIONAL AMENITIES', 'CUSTOM FIELDS' and 'site.concepts' if service exists, skip. If not, assign value.
      let serviceType;
      let serviceName;
      let img;

      for (let service of location.AdditionalAmenities) {
        serviceType = "Amenity";
        serviceName = service.SiteManagementItem.Title;
        img = undefined;
        if (!servicesCache[serviceName]) {
          servicesCache[serviceName] = serviceName;
          // if service is undefined in PSQL, add to services table:
          await db("services").insert({
            serviceType,
            serviceName,
            img,
          });
        }
      }

      for (let service of location.CustomFields) {
        serviceType = "Others";
        serviceName = service.CustomField.Label;
        img = service.CustomField.FacilityLogo;

        if (!servicesCache[serviceName]) {
          servicesCache[serviceName] = serviceName;
          await db("services").insert({
            serviceType,
            serviceName,
            img,
          });
        }

        const locationID = id;

        const serviceObj = await db
          .from("services")
          .select("id")
          .where("serviceName", serviceName);

        const serviceID = serviceObj[0].id; // FIX the bug here

        await db("locations_services").insert({
          locationID,
          serviceID,
        });
      }

      for (let concept of location.Site.Concepts) {
        serviceType = "Restaurant";
        serviceName = concept.Concept.Name;
        img = concept.Concept.ConceptIcon;

        if (!servicesCache[serviceName]) {
          servicesCache[serviceName] = serviceName;
          await db("services").insert({
            serviceType,
            serviceName,
            img,
          });
        }
      }
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
};
