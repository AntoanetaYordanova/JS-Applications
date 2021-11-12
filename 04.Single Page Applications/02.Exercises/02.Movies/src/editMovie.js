import { showHomePage } from "./homePage.js";

const editMovieSection = document.getElementById('edit-movie');
const main = document.getElementById('main');
const form  = editMovieSection.querySelector('form');

let userData = '';
let movieData = '';

form.addEventListener('submit', onSubmit);

export function showEditMovieSection(mData) {
    movieData = mData;
    userData = JSON.parse(localStorage.getItem('userData'));
    
    main.replaceChildren(editMovieSection);
}

async function onSubmit(ev){
    ev.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

   if(title !== '') {
    movieData.title = title;
   }

   if(description != '') {
       movieData.description = description;
   }

   if(img != '') {
    movieData.img = img;
   }

   try {
    await updateMovie();
    showHomePage();
   } catch (er) {
       alert(er)
   }
}

async function updateMovie() {
    const url = ' http://localhost:3030/data/movies/' + movieData._id;
    const res = await fetch(url, {
        method : 'put',
        headers : {
            'Content-Type' : 'application/json',
            'X-Authorization': userData.token
        },
        body : JSON.stringify(movieData)
    });

    if(res.ok != true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
    
}