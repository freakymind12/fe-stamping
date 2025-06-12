import 'ant-design-vue/dist/reset.css'
import '@/assets/css/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')

router.beforeEach((to, from, next) => {
  const mainTitle = 'IoT Stamping'
  const pageTitle =
    typeof to.meta.breadcrumb === 'string' ? to.meta.breadcrumb : to.name
  document.title = `${pageTitle} - ${mainTitle}`
  next()
})
