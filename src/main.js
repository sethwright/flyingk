import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";

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
