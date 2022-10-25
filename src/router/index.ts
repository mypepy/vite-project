import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
import { getAdminInfoApi } from '../../request/api'
import Cookies from 'js-cookie'
import store from '../store'

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/login.vue')
    },
    // {
    //     path: '/homepage',
    //     name: 'homepage',
    //     component: () => import('../views/homepage/homepage.vue')
    // },
    // {
    //     path: '/pms',
    //     name: 'pms',
    //     component: () => import('../views/homepage/homepage.vue'),
    //     children: [
    //         {
    //             path: 'product',
    //             name: 'product',
    //             component: () => import('../views/pms/product.vue'),
    //         }
    //     ]
    // }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
// 根据getters里面的菜单对象，生成路由规则
const genRouters = () => {
    const menus = store.getters.getNewMenus;
    // const newRoutes: RouteRecordRaw[] = [];
    for (let key in menus) {
        const newRoutes: RouteRecordRaw = {
            path: '/' + menus[key].name,
            name: menus[key].name,
            component: () => import('../views/homepage/homepage.vue'),
            redirect: '/' + menus[key].name + '/' + menus[key].children[0].name,
            children: []
        }
        for (let i = 0; i < menus[key].children.length; i++) {
            newRoutes.children?.push({
                path: menus[key].children[i].name,
                name: menus[key].children[i].name,
                component: () => import(`../views/${menus[key].name}/${menus[key].children[i].name}.vue`),
            })
        }

        // 动态添加路由规则
        router.addRoute(newRoutes)
    }
    // 动态添加首页
    router.addRoute({
        path: '/',
        name: 'homepage',
        component: () => import('../views/homepage/homepage.vue'),
        redirect: '/index',
        children: [
            {
                path: 'index',
                name: 'index',
                component: () => import('../views/index/index.vue'),
            }
        ]
    })
}
// 前置导航守卫
router.beforeEach((to, from, next) => {
    // 1 token && vuex里面menu（权限列表）为空
    const token = Cookies.get('token');
    if (token && store.state.menus.length === 0) {
        store.dispatch('getAdminInfo').then(() => {
            genRouters()
            next(to)
        })
    }
    else if (token && store.state.menus.length !== 0 && from.path === '/login' && to.path === '/homepage') {
        genRouters();
        next('/index')
    }
    else if (!token && to.path !== '/login') {
        next('/login')
    }
    else if (token && to.path === '/login') {
        next(from)
    }
    else {
        next();
    }

})
export const initRouter = (app: App<Element>) => {
    app.use(router)
}
// export default router