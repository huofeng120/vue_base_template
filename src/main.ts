import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

// 样式导入顺序（normalize.css → Tailwind → 自定义样式）
import 'normalize.css'
import './styles/tailwind.css'
import './style.css'

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
