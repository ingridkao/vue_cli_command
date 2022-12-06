import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'

import App from './App.vue'
import router from './router'
import store from './store'
import firebase from './assets/config/firebase'

import 'view-ui-plus/dist/styles/viewuiplus.css'

//global style
import "@/assets/css/reset.css"
import "@/assets/css/style.css"
import "@/assets/scss/style.scss"

const app = createApp(App)
app.use(ViewUIPlus)
.use(router)
.use(store)
.use(firebase)
.mount('#app')
