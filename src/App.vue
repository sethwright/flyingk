<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left>
      <v-toolbar-title class="d-flex align-center">
        <h1>Flying K</h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <SideNav />
    <v-main>
      <Map />
      <List v-if="cardOpen === false" />
      <Card v-else />
    </v-main>
  </v-app>
</template>

<script>
import Map from "./components/Map";
import SideNav from "./components/SideNav";
import List from "./components/List";
import Card from "./components/Card";

export default {
  name: "App",
  components: {
    Map,
    SideNav,
    List,
    Card,
  },
  computed: {
    selectedLocation: function() {
      return this.$store.state.selectedLocation;
    },
    drawer: function() {
      return this.$store.state.drawer;
    },
    completeLocations: function() {
      return this.$store.state.completeLocations;
    },
    cardOpen: function() {
      return this.$store.state.cardOpen;
    },
  },
  mounted() {
    this.getCompleteLocations();
  },
  data: () => ({}),
  methods: {
    toggleDrawer: function() {
      this.$store.commit("setDrawer", !this.$store.state.drawer);
    },
  },
};
</script>
