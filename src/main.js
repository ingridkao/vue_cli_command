import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'

import App from './App.vue'
import router from './router'
import store from './store'
import firebase from './config/firebase'

import 'view-ui-plus/dist/styles/viewuiplus.css'


const app = createApp(App)
app.use(ViewUIPlus)
.use(router)
.use(store)
.use(firebase)
.mount('#app')
