import { createApp } from 'vue'
import App from './App.vue'
import './style/reset.scss'
import {router} from "./router";
import {createPinia} from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const store = createPinia()
store.use(piniaPluginPersistedstate)
createApp(App).use(router).use(store).mount('#app')
