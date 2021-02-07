<template>
  <v-container class="mainCard pl-5 pt-5" fluid>
    <v-card>
      <v-row justify="end">
        <v-col>
          <v-card-title>{{
            selectedLocation.name +
              (selectedLocation.highway
                ? " - " +
                  selectedLocation.highway +
                  " - " +
                  selectedLocation.exit_num
                : " ")
          }}</v-card-title>
          <v-card-subtitle>{{
            selectedLocation.address + " - " + selectedLocation.type
          }}</v-card-subtitle>
        </v-col>
        <v-btn class="mr-5 mt-6" @click="toggleCard">Back</v-btn>
      </v-row>
      <v-divider></v-divider>
      <v-row class="pt-3 pl-5">
        <v-col>
          <h2>Available Services</h2>
          <p
            v-for="service in selectedLocation.services"
            :key="service.servicename"
          >
            {{ service }}
          </p>
        </v-col>
        <v-col>
          <h2>Gas Prices</h2>
          <p>Unleaded: ${{ selectedLocation.unleaded }}</p>
          <p>Midgrade: ${{ selectedLocation.midgrade }}</p>
          <p>Premium: ${{ selectedLocation.premium }}</p>
          <p>Diesel: ${{ selectedLocation.diesel }}</p>
          <p>Propane: ${{ selectedLocation.propane }}</p>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    selectedLocation: function() {
      return this.$store.state.selectedLocation;
    },
    cardView: function() {
      return this.$store.state.cardOpen;
    },
  },
  methods: {
    toggleCard: function() {
      this.$store.commit("setCard", !this.$store.state.cardOpen);
    },
  },
};
</script>

<style>
.mainCard {
  position: absolute;
  top: 44%;
  width: 100vw;
  height: 50vh;
  z-index: 2;
  overflow: scroll;
}
.card {
  width: 100%;
}
</style>
