import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import './assets/index.css';
import './assets/dragDropEx.css';
import App from './App.vue';

const app = createApp(App);
app.use(ElementPlus);
app.mount('#app');

// createApp(App).mount('#app')
