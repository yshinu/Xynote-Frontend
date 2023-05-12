import {createApp} from 'vue'
import App from './App.vue'
import './style/reset.scss'
import {router} from "./router";
import {createPinia} from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js/lib/core';

VMdEditor.use(githubTheme, {
    Hljs: hljs,
});

const store = createPinia()
store.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(router)
app.use(store)
app.use(VMdEditor);
app.mount('#app')
