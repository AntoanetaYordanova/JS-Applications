import { get } from "./api.js";
import { post } from "./api.js";

export async function getData() {
   return await get('/jsonstore/advanced/dropdown');
}

export async function uploadArticle(data) {
    await post('/jsonstore/advanced/dropdown', data);
}
