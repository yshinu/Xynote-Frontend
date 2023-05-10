import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {path: '/', redirect: '/notebooks'},
    { path: '/login', component:()=>import('../view/login.vue'), name:'login',meta:{
            title:"登录页面",
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
const whilstList:Array<string> = ['login','reg']
router.beforeEach(async (to, from) => {
    if (whilstList.includes(<string>to.name)){
        return true
    }else {
        if (!localStorage.getItem('token')){
            return {name:'login'}
        }else {
            return true
        }
    }

})
