import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import axios from "axios";
import VueAxios from "vue-axios";

createApp(App).use(VueAxios, axios, store).use(router).mount("#app");
