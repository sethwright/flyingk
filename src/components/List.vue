<template>
  <v-container class="listContainer" fluid>
    <!-- <v-overlay value="false"/> -->
    <v-card
      v-for="location in locationObjects"
      :key="location.name"
      class="mt-3"
      hover
      @click="toggleModal(location)"
    >
      <v-card-title>{{ location.name }}</v-card-title>
      <v-card-subtitle>{{ location.address }}</v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.getServices();
  },
  computed: {
    locationObjects() {
      return this.$store.state.locationObjects;
    },
  },
  methods: {
    toggleModal: function(loc) {
      this.$store.dispatch("selectLocation", loc);
    },
    getServices: function() {
      this.$store.dispatch("loadServices");
    },
  },
};
</script>

<style>
.listContainer {
  position: absolute;
  top: 41%;
}
</style>
