//to finish the like logic

import { showEditMovieSection } from "./editMovie.js";
import { showHomePage } from './homePage.js'

let userData = '';
let currentMovieId = '';
let movieData = '';

const movieDetailsSection = document.getElementById('movie-details');
const main = document.getElementById('main');
const buttonsActions = {
    deleteBtn : onDelete,
    editBtn : onEdit,
    likeBtn : onLike
}

movieDetailsSection.addEventListener('click', (ev) => {
    if(ev.target.tagName == 'A') {
        const action = buttonsActions[ev.target.id];
        if(action != undefined) {
            action();
        }
    }
});

export async function showMovieDetailsSection(id) {
    userData = JSON.parse(localStorage.getItem('userData'));
    currentMovieId = id;
    main.replaceChildren(movieDetailsSection);
    movieDetailsSection.innerHTML = 'Loading...'
    movieData = await getMovieData(id);
    const totalLikes = await getLikesNum(id);
    createMovieEl(movieData, totalLikes);
    const likesFromUser = await getLikeFromUser(id);
}

function createMovieEl(data, totalLikes) {
    const ownerId = movieData._ownerId;
    const div = document.createElement('div');
    div.className = 'container';
    div.innerHTML = `<div class="row bg-light text-dark">
    <h1>Movie title: ${data.title}</h1>

    <div class="col-md-8">
      <img
        class="img-thumbnail"
        src="${data.img}"
        alt="Movie"
      />
    </div>
    <div class="col-md-4 text-center">
      <h3 class="my-3">Movie Description</h3>
      <p>
        ${data.description}
      </p>
      <a class="btn btn-danger" href="#" id="deleteBtn" style="display : ${userData.userId == ownerId ? '' : 'none'}">Delete</a>
      <a class="btn btn-warning" href="#" id="editBtn" style="display : ${userData.userId == ownerId ? '' : 'none'}">Edit</a>
      <a class="btn btn-primary" href="#" id="likeBtn" style="display : ${userData.userId == ownerId ? 'none' : ''}">Like</a>
      <span class="enrolled-span" id="likesSection">Liked ${totalLikes.length}</span>
    </div>
  </div>`;
  movieDetailsSection.replaceChildren(div);
}

 /* --- Buttons Actions Functions */
async function onLike() {
    const likesFromUser = await getLikeFromUser(userData._id);
    console.log(likesFromUser);
}

function onDelete() {
    try {
        deleteMovie(currentMovieId);
        showHomePage();
    } catch (er) {
        alert(er);
    }
}

function onEdit() {
    showEditMovieSection(movieData);
}


/* --- Request Functions --- */

async function deleteMovie(id) {
    // const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData.token;
    const url = `http://localhost:3030/data/movies/${id}`;
    const res = await fetch(url,{
        method : 'delete',
        headers : {
            'X-Authorization': token
        }
    });

    if(res.ok != true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
}

async function getLikesNum(id) {
    const url = `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count (`
    const res = await fetch(url);

    if(res.ok != true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
}

async function getLikeFromUser(movieId) {
    // const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData.userId;
    const url = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`
    const res = await fetch(url);

    if(res.ok != true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
    
}

async function getMovieData(id) {
    const url = 'http://localhost:3030/data/movies/' + id;
    const res = await fetch(url);

    if(res.ok != true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
}