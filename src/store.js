import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [],
    locationObjects: [],
    displayedObjects: [],
    serviceObjects: [],
    amenities: [],
    others: [],
    restaurants: [],
    selectedLocation: {},
    completeLocations: {},
    drawer: false,
    cardOpen: false,
  },
  mutations: {
    setLocations(state, locations) {
      state.locations = locations;
    },
    setLocationObjects(state, locationObjects) {
      state.locationObjects = locationObjects;
    },
    setServiceObjects(state, serviceObjects) {
      state.serviceObjects = serviceObjects;
    },
    setSelectedLocation(state, selectedLocation) {
      state.selectedLocation = selectedLocation;
    },
    setDrawer(state, toggle) {
      state.drawer = toggle;
    },
    setCard(state, toggle) {
      state.cardOpen = toggle;
    },
    setCompleteLocations(state, completeLocations) {
      state.completeLocations = completeLocations;
    },
    setAmenities(state, amenities) {
      state.amenities = amenities;
    },
    setOthers(state, others) {
      state.others = others;
    },
    setRestaurants(state, restaurants) {
      state.restaurants = restaurants;
    },
    setDisplayObjects(state, displayObjects) {
      state.displayedObjects = displayObjects;
    },
  },
  actions: {
    async loadMarkers({ commit }) {
      try {
        const { data: locations } = await axios.get("/api/services/locations"); // ES6 destructuring & aliasing

        const finalLocations = {};

        locations.forEach((location) => {
          if (!finalLocations[location.location_id]) {
            finalLocations[location.location_id] = location;
            finalLocations[location.location_id].services = [];
          }
          finalLocations[location.location_id].services.push(
            location.servicename
          );
        });

        const locationsArray = [];

        for (let loc in finalLocations) {
          finalLocations[loc].position = {
            lat: finalLocations[loc].latitude,
            lng: finalLocations[loc].longitude,
          };
          finalLocations[loc].key = finalLocations[loc].name;
          finalLocations[loc].defaultAnimation = 2;
          locationsArray.push(finalLocations[loc]);
        }

        // const markers = locations.map((location) => ({
        //   position: {
        //     lat: location.latitude,
        //     lng: location.longitude,
        //   },
        //   key: location.name,
        //   defaultAnimation: 2,
        // }));
        commit("setDisplayObjects", locationsArray);
        commit("setLocationObjects", locationsArray);
        // commit("setLocations", markers);
      } catch (err) {
        console.error(err);
      }
    },
    selectLocation: function({ commit }, loc) {
      commit("setSelectedLocation", loc);
      commit("setCard", true);
    },
    async loadServices({ commit }) {
      try {
        const { data: services } = await axios.get("/api/services");

        const amenities = [];
        const others = [];
        const restaurants = [];

        services.forEach((item) => {
          if (item.servicetype === "Amenity") amenities.push(item);
          if (item.servicetype === "Others") others.push(item);
          if (item.servicetype === "Restaurant") restaurants.push(item);
        });

        commit("setAmenities", amenities);
        commit("setOthers", others);
        commit("setRestaurants", restaurants);
        commit("setServiceObjects", services);
      } catch (err) {
        console.error(err);
      }
    },
    filterByCity({ commit, state }, filterCity) {
      const locations = state.displayedObjects;
      const filteredLocations = locations.filter(
        (location) => location.city === filterCity
      );
      commit("setLocationObjects", filteredLocations);
    },
    filterByState({ commit, state }, filterState) {
      const locations = state.displayedObjects;
      const filteredLocations = locations.filter(
        (location) => location.state === filterState
      );
      commit("setLocationObjects", filteredLocations);
    },
    filterByType({ commit, state }, filterType) {
      const locations = state.displayedObjects;
      const filteredLocations = locations.filter(
        (location) => location.type === filterType
      );
      commit("setLocationObjects", filteredLocations);
    },
    clearFilter({ commit, state }) {
      commit("setLocationObjects", state.displayedObjects);
    },
    filterByService({ commit, state }, filterService) {
      const locations = state.locationObjects;
      const filtered = locations.filter((location) => {
        return location.services.includes(filterService[0]);
      });
      commit("setLocationObjects", filtered);
    },
  },
  getters: {
    drawerState: function(state) {
      return state.drawer;
    },
    cardState: function(state) {
      return state.cardOpen;
    },
    getLocationObjects(state) {
      return state.locationObjects;
    },
    getDisplayedObjects(state) {
      return state.displayedObjects;
    },
  },
});
