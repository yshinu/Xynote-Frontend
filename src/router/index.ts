import {createRouter, createWebHashHistory, RouteLocationNormalized, Router, RouteRecordRaw} from "vue-router";
import {instance} from "../../axios/http.ts";

const routes: RouteRecordRaw[] = [
    {path: '/', redirect: '/notebooks'},
    {
        path: '/login', component: () => import('../view/login.vue'), name: 'login', meta: {
            title: "登录页面",
        }
    },
    {path: '/reg', name: 'reg', component: () => import('../view/Reg.vue')},
    {path: '/notebooks', component: () => import('../view/notebooks.vue')},
    {path: '/note/:noteId/:notebookName', name: 'notebookDetail', component: () => import('../view/notedetails.vue')},
    {path: '/vip-markdown', component: () => import('../view/trash.vue'),
            beforeEnter(to,from,next){
                instance.get('/vip').then(res=> {
                    if (res.data.isVip){
                        next()
                    }
                    return false
                })
    }
    },
    {path: '/404', component: () => import('../view/404.vue')},
    {path: '/:catchAll(.*)', redirect: '/404'}

]

export const router: Router = createRouter({

    history: createWebHashHistory(),
    routes,
})
const whilstList: Array<string> = ['login', 'reg']
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (whilstList.includes(<string>to.name)) {
        return true
    } else {
        if (!localStorage.getItem('token')) {
            return {name: 'login'}
        } else {
            return true
        }
    }

})
