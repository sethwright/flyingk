<template>
  <v-navigation-drawer
    v-model="drawerState"
    class="pl-3 pr-3"
    align="center"
    app
    clipped
  >
    <h1 class="mt-6">Location</h1>
    <v-spacer></v-spacer>
    <v-divider></v-divider>
    <v-select
      item-text="city"
      item-value="city"
      placeholder="Select City"
      :items="locations"
      @change="changeCity"
    ></v-select>
    <v-spacer></v-spacer>
    <v-select
      item-text="state"
      item-value="state"
      placeholder="Select State"
      :items="locations"
      @change="changeState"
    ></v-select>
    <v-spacer></v-spacer>
    <v-select
      item-text="highway"
      item-value="highway"
      placeholder="Select Highway"
      :items="locations"
    ></v-select>
    <h1 class="mt-6">Store Type</h1>
    <v-divider></v-divider>
    <v-select
      placeholder="Store Type"
      item-text="type"
      item-value="type"
      :items="locations"
      chips
      @change="filterType"
    ></v-select>
    <v-spacer></v-spacer>
    <h1 class="mt-6">Other Services</h1>
    <v-divider></v-divider>
    <v-select
      placeholder="Other Services"
      item-text="servicename"
      item-value="servicename"
      :items="others"
      @change="filterService"
      chips
      multiple
    ></v-select>
    <v-spacer></v-spacer>
    <h1 class="mt-6">Amenities</h1>
    <v-divider></v-divider>
    <v-select
      placeholder="Amenities"
      item-text="servicename"
      item-value="servicename"
      :items="amenities"
      @change="filterService"
      chips
      multiple
    ></v-select>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <h1 class="mt-6">Restaurants</h1>
    <v-divider></v-divider>
    <v-select
      placeholder="Restaurants"
      item-text="servicename"
      item-value="servicename"
      :items="restaurants"
      @change="filterService"
      chips
      multiple
    ></v-select>
    <v-btn @click="clearFilter" class="mb-5 mt-3 buttons">Clear</v-btn>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer"],
  mounted() {
    this.getServices();
  },
  computed: {
    drawerState: function() {
      return this.$store.state.drawer;
    },
    services() {
      return this.$store.state.serviceObjects;
    },
    amenities() {
      return this.$store.state.amenities;
    },
    others() {
      return this.$store.state.others;
    },
    restaurants() {
      return this.$store.state.restaurants;
    },
    locations() {
      return this.$store.state.locationObjects;
    },
  },
  methods: {
    getServices: function() {
      this.$store.dispatch("loadServices");
    },
    changeCity: function(event) {
      this.$store.dispatch("filterByCity", event);
    },
    changeState: function(event) {
      this.$store.dispatch("filterByState", event);
    },
    clearFilter: function() {
      this.$store.dispatch("clearFilter");
    },
    filterService: function(event) {
      this.$store.dispatch("filterByService", event);
    },
    filterType: function(event) {
      this.$store.dispatch("filterByType", event);
    },
  },
};
</script>

<style></style>
