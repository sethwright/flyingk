import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDJ3sPnmTBMN1DZGJBX9gxuNg-O9mgHOAo",
    libraries: "geometry,drawing,places",
  },
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
