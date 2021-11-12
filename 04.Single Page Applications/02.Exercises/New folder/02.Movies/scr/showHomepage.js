import { showSection, e, refreshNav } from "./dom.js";
import { showMovieDetails } from "./movieDetails.js";

const section = document.getElementById('home-page');
const moviesSection = document.querySelector('#movie .card-deck');

moviesSection.addEventListener('click', (ev) => {
    if(ev.target.tagName == 'BUTTON') {
       showMovieDetails(ev.target.dataset.movieId);
    }
})

section.remove();

export async function showHomepage() {
    refreshNav();
    showSection(section);
    moviesSection.innerHTML = '<p>Loading...</p>'
    const moviesData = await getMovies();
    moviesSection.replaceChildren();

    for(let movie of Object.values(moviesData)) {
        const url = movie.img;
        const title = movie.title;
        const movieId = movie._id;

        const div = e('div', {}, ['card', 'mb-4'], e('img', {src : url, alt : 'Card image cap', width : '400'}, ['card-img-top']), e('div', {}, ['card-body'], e('h4', {}, ['card-title'], title)), e('div', {}, ['card-footer'], e('a', {}, [], e('button', {type:'button', 'data-movieId' : [movieId]}, ['btn', 'btn-info'], 'Details'))));
        moviesSection.appendChild(div)
    }
}

async function getMovies() {
    const res = await fetch('http://localhost:3030/data/movies');

    if(res.ok !== true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
}