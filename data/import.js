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

        // if (unleaded === undefined) unleaded = "-";
        // if (midgrade === undefined) midgrade = "-";
        // if (premium === undefined) premium = "-";
        // if (diesel === undefined) diesel = "-";
        // if (propane === undefined) propane = "-";
      });

      // Acquiring contact details.

      for (let contact of location.ContactMethods) {
        if (contact.Type.Name === "Fax") {
          fax = contact.Data;
        } else if (contact.Type.Name === "Main Phone") {
          telephone = contact.Data;
        }
      }

      const result = await db("locations").insert({
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
      console.log(result);

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
          //const eachService =
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
          //const eachService =
          await db("services").insert({
            serviceType,
            serviceName,
            img,
          });
        }
      }

      // // if service is undefined in PSQL, add to services table:
      // const servicesResult = await db("services").insert({
      //   // some stuff here
      // });
      // for (let service of location.site.concepts) {
      //   serviceType;
      //   serviceName;
      //   img;
      // }

      // // if service is undefined in PSQL, add to services table:
      // const servicesResult = await db("services").insert({
      //   // some stuff here
      // });
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
};
