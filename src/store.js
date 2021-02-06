import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [],
    locationObjects: [],
    serviceObjects: [],
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
        const { data: services } = await axios.get("/api.services");
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
