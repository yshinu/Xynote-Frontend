import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {path: '/', redirect: '/notebooks'},
    { path: '/login', component:()=>import('../view/login.vue'), meta:{
            title:"登录页面",
            transition:"animate__fadeInUp",
        }
    },
    { path: '/reg', component:()=>import('../view/Reg.vue') },
    { path: '/notebooks', component:()=>import('../view/notebooks.vue') },
    { path: '/note/:noteId', component:()=>import('../view/notedetails.vue') },
    { path: '/trash/:noteId', component:()=>import('../view/trash.vue') },
    {path: '/404',component:()=>import('../view/404.vue')},
    { path: '/:catchAll(.*)', redirect: '/404'}


]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
