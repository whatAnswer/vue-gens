import VueRouter from "vue-router"
import Login from "../views/Login"
import Prize from "../views/Prize"

const routes = [
    { path: '/', name: "Prize", component: Prize },
    { path: '/Login', name: "Login", component: Login }
    // { path: '/Prize', name: "Prize", component: Prize }
]

const router = new VueRouter({
    mode: 'hash',
    routes // (缩写) 相当于 routes: routes
})

export default router
