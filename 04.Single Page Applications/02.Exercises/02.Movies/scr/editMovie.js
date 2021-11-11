import { showSection } from "./dom.js";
import { getMovieData, showMovieDetails } from './movieDetails.js'

const section = document.getElementById('edit-movie');
const form = section.querySelector('form');


section.remove();

export async function showEditMovieSection(movieId) {
    const movieData = await getMovieData(movieId);
    showSection(section);
    form.addEventListener('submit', onSubmit);

    async function onSubmit(ev) {    
        ev.preventDefault();
        const data = new FormData(form);
        const title = data.get('title');
        const description = data.get('description');
        const imageUrl = data.get('imageUrl');

        if(title != '') {
            movieData.title = title;
        }

        if(description != '') {
            movieData.description = description;
        }

        if(imageUrl != '') {
            movieData.img = imageUrl;
        }

        try{
            uploadMovieData(movieData, movieId);

            showMovieDetails(movieId);
        } catch(er) {
            alert(er)
        }
    }    

}


async function uploadMovieData(data, id) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const url = 'http://localhost:3030/data/movies/' + id;
    const resp = await fetch(url, {
        method : 'put', 
        headers : {
            'Content-Type' : 'application/string',
            'X-Authorization' : [userData.accessToken]
        }, 
        body : JSON.stringify(data)
    });

    if(resp.ok !== true) {
        const response = await resp.json();
        throw new Error(response.message);
    }

    return await resp.json();
}


