import {instance} from "../../axios/http.ts";
import {useBookListStore} from "../store/pinia.ts";
const bookList = useBookListStore()
export const refrash = function () {
    instance.get('/booklist').then(
        res => {
            const {booklist, ids} = res.data
            // @ts-ignore
            const result = booklist.reduce((acc, curr, index) => {
                acc[curr] = ids[index];
                return acc;
            }, {});
            bookList.resetBookList(result)
        }
    )
}