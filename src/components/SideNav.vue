<template>
  <v-navigation-drawer v-model="drawer" class="pl-3" app clipped>
    <h1 class="mt-6">Location</h1>
    <v-spacer></v-spacer>
    <v-divider></v-divider>
    <v-select
      item-text="city"
      item-value="city"
      placeholder="Select State"
      :items="cities"
    ></v-select>
    <v-spacer></v-spacer>
    <v-select
      item-text="city"
      item-value="city"
      placeholder="Select City"
      :items="cities"
    ></v-select>
    <v-spacer></v-spacer>
    <v-select
      item-text="city"
      item-value="city"
      placeholder="Select Highway"
      :items="cities"
    ></v-select>
    <v-spacer></v-spacer>
    <h1 class="mt-6">Truck Services</h1>
    <v-divider></v-divider>
    <v-select
      placeholder="Truck Services"
      item-text="service"
      item-value="service"
      :items="truckServices"
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
      :items="amenities"
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
      :items="locationType"
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
      :items="restaurants"
      chips
      multiple
    ></v-select>
  </v-navigation-drawer>
</template>

<script>
export default {};
</script>

<style></style>
