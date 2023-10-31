import { createApp} from 'vue'
import App from './App.vue'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import globalComponents from './components/global/index.js'
import VeeValidatePlugin from './includes/validation.js';
import './assets/main.css'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App);

app.use(globalComponents);
app.use(VeeValidatePlugin);
app.use(bootstrap);

app.mount('#app');

