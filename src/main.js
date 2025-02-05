import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from './router/main'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()


app.use(Toast).use(router).use(pinia).mount('#app')
