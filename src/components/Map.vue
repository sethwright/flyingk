<template>
  <GmapMap
    :zoom="4"
    :center="{ lat: 25.7392, lng: -104.9903 }"
    map-type-id="terrain"
    style="width: 100%; height: 300px"
  >
    <GmapMarker
      v-for="location in locations"
      :key="location.key"
      :position="location.position"
      :animation="location.defaultAnimation"
      @rightclick="markerRightClicked"
    />
  </GmapMap>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  mounted() {
    this.getLocations();
  },
  computed: {
    locations() {
      return this.$store.state.locations;
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
