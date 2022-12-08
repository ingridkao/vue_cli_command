import { createApp } from 'vue'

//引入第三方函式庫 
import axios from 'axios';
import ViewUIPlus from 'view-ui-plus'
import firebase from './assets/config/firebase'

import App from './App.vue'
import router from './router'
import store from './store'

//引入第三方函式庫的style
import 'view-ui-plus/dist/styles/viewuiplus.css'

//global style
import "@/assets/css/reset.css"
import "@/assets/css/style.css"
import "@/assets/scss/style.scss"



const app = createApp(App)

// 將axios變成全域指向
app.config.globalProperties.axios=axios

// 註冊第三方函式庫 
app.use(ViewUIPlus)
app.use(firebase)

app.use(router)
app.use(store)

app.mount('#app')
