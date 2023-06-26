import { createApp } from 'vue';
import App from './App.vue';
import './index.less';

console.log(import.meta.env.VITE_ABC);

const app = createApp(App);
app.mount('#app');
