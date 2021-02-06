<template>
  <v-container class="listContainer" fluid>
    <v-card v-for="store in stores" :key="store.name" class="mt-3" hover>
      <v-card-title>{{ store.name }}</v-card-title>
      <v-card-subtitle>{{ store.address }}</v-card-subtitle>
      <v-card-text>{{ store.highway + store.exit }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.listContainer {
  position: absolute;
  top: 41%;
}
</style>
