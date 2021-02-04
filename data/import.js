const fs = require("fs");
const db = require("../server/knex.js");

// const hashMap = {}; // cache

module.exports = async () => {
  try {
    //const locations = JSON.parse(fs.readFileSync("../data/locations.json"));
    const locations = JSON.parse(
      fs.readFileSync(`${__dirname}/locations.json`)
    );
    for (const location of locations) {
      // ADDING TO LOCATION TABLE
      const id = location.Site.SiteId;
      const name = location.Name;
      const type = location.FacilitySubtype.Name;
      const longitude = location.Site.Longitude;
      const latitude = location.Site.Latitude;
      const address = location.Addresses.Address1;
      const state = location.Addresses.state;
      const city = location.Addresses.city;
      const tel = location.ContactMethods[1].Data;
      const fax = location.ContactMethods[2].Data;
      let unleaded;
      let midgrade;
      let premium;
      let diesel;
      let propane;

      //* Getting each of the Fuel Prices
      location.Site.FuelPrices.forEach((gas) => {
        const fuelType = gas.FuelType;
        if (fuelType === "Unleaded") {
          unleaded = gas.CashPrice;
        } else if (fuelType === "Midgrade") {
          midgrade = gas.CashPrice;
        } else if (fuelType === "Premium") {
          premium = gas.CashPrice;
        } else if (fuelType === "Dielsel") {
          diesel = gas.CashPrice;
        } else if (fuelType === "Propane") {
          propane = gas.CashPrice;
        }
      });

      const result = await db("locations").insert({
        id,
        name,
        type,
        latitude,
        longitude,
        address,
        city,
        state,
        tel,
        fax,
        unleaded,
        midgrade,
        premium,
        diesel,
        propane,
      });
      console.log(result);

      // ADDIN TO SERVICES TABLE Check services. Loop through 'ADDITIONAL AMENITIES', 'CUSTOM FIELDS' and 'site.concepts' if service exists, skip. If not, assign value.
      // let serviceType;
      // let serviceName;
      // let img;

      // for (let service of location.AdditionalAmenities) {
      //   serviceType;
      //   serviceName;
      //   img;
      // }
      // // if service is undefined in PSQL, add to services table:
      // const servicesResult = await db("services").insert({
      //   // some stuff here
      // });

      // for (let service of location.CustomFields) {
      //   serviceType;
      //   serviceName;
      //   img;
      // }
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
