// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/fonts/fonts.css'; // Импортируем файл с шрифтами
import store from '@/store';
import { createMetaManager } from 'vue-meta';


const app = createApp(App);
app.use(router); 
app.use(createMetaManager); 
app.use(store);

app.mount('#app');
document.dispatchEvent(new Event('render-event'))
