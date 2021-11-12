import { showMovieDetailsSection } from "./movieDetails.js";
import { showAddMovieSection } from "./addMovie.js";
import { resetNav } from "./app.js";

const homePageSection = document.getElementById('home-page');
const main = document.getElementById('main');
const moviesSection = document.querySelector('#movie .card-deck');
const addMovieBtn = document.querySelector('#add-movie-button a');

export async function showHomePage() {
    const loadingEl = document.createElement('p');
    loadingEl.textContent = 'Loading...';
    main.replaceChildren(homePageSection);
    moviesSection.replaceChildren(loadingEl);
    resetNav();

    try {
        const movies = await getAllMovies();
        moviesSection.replaceChildren(...movies.map(createMovieElement));
    } catch (er) {
        alert(er)
    }
}

addEvents();


function addEvents() {
    moviesSection.addEventListener('click', e => {
        if(e.target.tagName == 'BUTTON') {
            const movieId = e.target.dataset.id;
            showMovieDetailsSection(movieId);
        }
    });
    
    addMovieBtn.addEventListener('click',showAddMovieSection);
}

function createMovieElement(data) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const div = document.createElement('div');
    div.className = 'card mb-4';
    div.innerHTML = `<img
    class="card-img-top"
    src="${data.img}"
    alt="Card image cap"
    width="400"
  />
  <div class="card-body">
    <h4 class="card-title">${data.title}</h4>
  </div>
  <div class="card-footer">
    <a href="#/details/6lOxMFSMkML09wux6sAF">
      <button type="button" class="btn btn-info" data-id="${data._id}" ${userData == null ? 'disabled' : ''}>Details</button>
    </a>
  </div>`

  return div;
}

async function getAllMovies() {
    const res = await fetch('http://localhost:3030/data/movies');
    
    if(res.ok != true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
}
