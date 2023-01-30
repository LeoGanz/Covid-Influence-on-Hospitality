import {createApp, markRaw} from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import {faSackDollar, faVirusCovid} from "@fortawesome/free-solid-svg-icons";

const app = createApp(App)

const pinia = createPinia()
pinia.use(({ store }) => { store.$router = markRaw(router) })
app.use(pinia)
app.use(router)

library.add(faVirusCovid, faSackDollar)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
