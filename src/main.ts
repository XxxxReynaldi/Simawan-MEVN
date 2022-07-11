import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

const app = createApp(App);

app.use(router);
app.component('vue-select', vSelect);
app.mount('#app');
