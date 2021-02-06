<template>
  <v-navigation-drawer v-model="drawerState" class="pl-3" app clipped>
    <h1 class="mt-6">Location</h1>
    <v-spacer></v-spacer>
    <v-divider></v-divider>
    <v-select
      item-text="city"
      item-value="city"
      placeholder="Select City"
      :items="locations"
    ></v-select>
    <v-spacer></v-spacer>
    <v-select
      item-text="state"
      item-value="state"
      placeholder="Select State"
      :items="locations"
    ></v-select>
    <v-spacer></v-spacer>
    <v-select
      item-text="highway"
      item-value="highway"
      placeholder="Select Highway"
      :items="locations"
    ></v-select>
    <v-spacer></v-spacer>
    <h1 class="mt-6">Other Services</h1>
    <v-divider></v-divider>
    <v-select
      placeholder="Other Services"
      item-text="service"
      item-value="service"
      :items="services"
      chips
      multiple
    ></v-select>
    <v-spacer></v-spacer>
    <h1 class="mt-6">Amenities</h1>
    <v-divider></v-divider>
    <v-select
      placeholder="Amenities"
      item-text="amenity"
      item-value="amenity"
      :items="services"
      chips
      multiple
    ></v-select>
    <v-spacer></v-spacer>
    <h1 class="mt-6">Store Type</h1>
    <v-divider></v-divider>
    <v-select
      placeholder="Store Type"
      item-text="type"
      item-value="type"
      :items="locations"
      chips
      multiple
    ></v-select>
    <v-spacer></v-spacer>
    <h1 class="mt-6">Restaurants</h1>
    <v-divider></v-divider>
    <v-select
      placeholder="Restaurants"
      item-text="restaurant"
      item-value="restaurant"
      :items="services"
      chips
      multiple
    ></v-select>
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
    locations() {
      return this.$store.state.locationObjects;
    },
  },
  methods: {
    getServices: function() {
      this.$store.dispatch("loadServices");
    },
  },
};
</script>

<style></style>
