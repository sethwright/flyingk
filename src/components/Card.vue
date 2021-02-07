<template>
  <v-card class="mainCard">
    <v-card-title>{{ selectedLocation.name }}</v-card-title>
  </v-card>
</template>

<script>
export default {
  computed: {
    selectedLocation: function() {
      return this.$store.state.selectedLocation;
    },
  },
};
</script>

<style>
.mainCard {
  height: 50vh;
  width: 50vw;
  z-index: 2;
}
</style>
