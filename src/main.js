import { createApp } from 'vue'
import 'virtual:windi.css'
import { store } from './store'
import { router } from './router'

import App from './App.vue'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
