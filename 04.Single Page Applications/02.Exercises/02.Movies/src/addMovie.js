import { showHomePage } from "./homePage.js";

const addMovieSection = document.getElementById('add-movie');
const main = document.getElementById('main');
const form = addMovieSection.querySelector('form');
let userData = '';

export function showAddMovieSection() {
    userData = JSON.parse(localStorage.getItem('userData'));
    console.log(userData.token);
    main.replaceChildren(addMovieSection);
}

form.addEventListener('submit', onMovieAdd);

async function onMovieAdd(ev) {

    ev.preventDefault();

    const data = new FormData(form);
    const title = data.get('title');
    const description = data.get('description');
    const imageUrl = data.get('imageUrl');

    try {
        await postMovie({title, description, imageUrl});
        showHomePage();
    } catch (er) {
        alert(er);
    }
}

async function postMovie(data) {
    const url = 'http://localhost:3030/data/movies';

    const res = await fetch(url, {
        method : 'post',
        headers : {
            'Content-Type' : 'application/json',
            'X-Authorization': userData.token
        },
        body : JSON.stringify(data)
    });

    if(res.ok != true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
}
