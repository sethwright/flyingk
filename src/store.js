import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [],
    locationObjects: [],
    serviceObjects: [],
    amenities: [],
    others: [],
    restaurants: [],
    selectedLocation: {},
    drawer: false,
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
    setAmenities(state, amenities) {
      state.amenities = amenities;
    },
    setOthers(state, others) {
      state.others = others;
    },
    setRestaurants(state, restaurants) {
      state.restaurants = restaurants;
    },
  },
  actions: {
    async loadMarkers({ commit }) {
      try {
        const { data: locations } = await axios.get("/api/locations"); // ES6 destructuring & aliasing
        const markers = locations.map((location) => ({
          position: {
            lat: location.latitude,
            lng: location.longitude,
          },
          key: location.name,
          defaultAnimation: 2,
        }));
        commit("setLocationObjects", locations);
        commit("setLocations", markers);
      } catch (err) {
        console.error(err);
      }
    },
    selectLocation: function({ commit }, loc) {
      commit("setSelectedLocation", loc);
    },
    async loadServices({ commit }) {
      try {
        const { data: services } = await axios.get("/api/services");

        const amenities = [];
        const others = [];
        const restaurants = [];

        services.forEach((item) => {
          if (item.serviceType === "Amenity") amenities.push(item);
          if (item.serviceType === "Others") others.push(item);
          if (item.serviceType === "Restaurant") restaurants.push(item);
        });

        commit("setAmenities", amenities);
        commit("setOthers", others);
        commit("setRestaurants", restaurants);

        commit("setServiceObjects", services);
      } catch (err) {
        console.error(err);
      }
    },
  },
  getters: {
    drawerState: function(state) {
      return state.drawer;
    },
  },
});
