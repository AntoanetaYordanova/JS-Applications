import { get } from './api.js';
import { getData } from './data.js';
import { uploadArticle } from './data.js';
import { html, render } from './node_modules/lit-html/lit-html.js';

const menu = document.getElementById('menu');
const input = document.getElementById('itemText');
document.querySelector('form').addEventListener('submit', onSubmit);

const articleTemplate = (article) => {
    return html`
    <option .value=${article._id}>${article.text}</option>`;
}

async function updateMenu() {
    const articles = await getData();
    render(Object.values(articles).map(articleTemplate), menu);
}


updateMenu();

async function onSubmit(ev) {
    ev.preventDefault();
    const newArticle = input.value;

   if(newArticle == '') {
       return alert('Input must be filled first');
   }

   uploadArticle({text : newArticle});
   updateMenu();
}

// { text: "Munich", _id: "8f414b4f-ab39-4d36-bedb-2ad69da9c830" }