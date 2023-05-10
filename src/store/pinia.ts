
import { defineStore } from 'pinia'
export const useLoginStore = defineStore('login', {
        state:()=>{
            return{
                email: 'a',
            }
        },
        persist: true,
        actions:{
        }

})

export const useBookListStore = defineStore('bookList', {
    state:()=>{
        return{
            email: 'a',
            notebooklist:['default']
        }
    },
    persist: true,
    actions:{
        resetBookList(booklist:string[]){
            this.notebooklist = booklist
        }
    }
})