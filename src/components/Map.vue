<template>
  <div id="mapContainer">
    <GmapMap
      :zoom="4"
      :center="{ lat: 38.7392, lng: -97.9903 }"
      map-type-id="terrain"
      style="width: 100%; height: 40vh"
    >
      <GmapMarker
        v-for="location in locations"
        :key="location.key"
        :position="location.position"
        :animation="location.defaultAnimation"
        @rightclick="markerRightClicked"
      />
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  mounted() {
    this.getLocations();
  },
  computed: {
    locations() {
      return this.$store.state.locationObjects;
    },
    google: gmapApi,
  },
  methods: {
    getLocations() {
      this.$store.dispatch("loadMarkers");
    },
    markerRightClicked() {},
  },
};
</script>

<style>
#mapContainer {
  position: fixed;
  top: 8vh;
  height: 40vh;
  width: 100%;
  z-index: 1;
}
</style>
