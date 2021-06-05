import { createApp } from 'vue'
import 'virtual:windi.css'
import { store } from './store'

import App from './App.vue'

createApp(App).use(store).mount('#app')
