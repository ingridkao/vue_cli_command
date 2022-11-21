import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'

import App from './App.vue'
import router from './router'
import store from './store'

import 'view-ui-plus/dist/styles/viewuiplus.css'

// createApp(App).use(store).use(router).mount('#app')

const app = createApp(App)
app.use(store)
.use(router)
.use(ViewUIPlus)
.mount('#app')
