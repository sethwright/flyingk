import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import dotenv from "dotenv";

dotenv.config();
console.log("VUE_APP_MAP_KEY");
console.log(process.env.VUE_APP_SOMEKEY);
// hi
Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: /* Your Maps Javascript API key here: */ "",
    libraries: "geometry,drawing,places",
  },
});

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

// VUE_APP_MAP_KEY
