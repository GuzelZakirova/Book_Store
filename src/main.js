import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import Cart from './pages/Cart.vue'
import Profile from './pages/Profile.vue'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

const routes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/favorites', component: Favorites},
    { path: '/profile', component: Profile },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
