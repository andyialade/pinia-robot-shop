import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//import localStoragePlugin from '@/stores/local-storage-plugin'

const app = createApp(App)
const pinia = createPinia()
//pinia.use(localStoragePlugin)

app.use(pinia)
   .use(router)

app.mount('#app')
