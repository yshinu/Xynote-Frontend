
import { defineStore } from 'pinia'
    export const useLoginStore = defineStore('login', {
        state:()=>{
            return{
                email: 'a'
            }
        },
        persist: true,
        actions:{
        }

})