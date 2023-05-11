
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
            notebooklist:{}
        }
    },
    persist: true,
    actions:{
        resetBookList(booklist:any){
            this.notebooklist = booklist
        }
    }
})
export const useBooksStore = defineStore('books', {
    state:()=>{
        return{
            email: 'a',
            books:[]
        }
    },
    persist: true,
    actions:{
        resetBooks(netBook:any){
            this.books = netBook
        }
    }
})