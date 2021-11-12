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
    const likes = await getLikesNum(id);
    createMovieEl(likes);
}

async function createMovieEl(totalLikes) {
    const likesFromUser = await getLikeFromUser(currentMovieId);
    const ownerId = movieData._ownerId;
    const div = document.createElement('div');
    div.className = 'container';
    
    div.innerHTML = `<div class="row bg-light text-dark">
    <h1>Movie title: ${movieData.title}</h1>

    <div class="col-md-8">
      <img
        class="img-thumbnail"
        src="${movieData.img}"
        alt="Movie"
      />
    </div>
    <div class="col-md-4 text-center">
      <h3 class="my-3">Movie Description</h3>
      <p>
        ${movieData.description}
      </p>
      
    </div>
  </div>`;
  movieDetailsSection.replaceChildren(div);
  let buttons = document.createElement('div');

  if(userData.userId == ownerId) {
    buttons.innerHTML = ` <a class="btn btn-danger" href="#" id="deleteBtn">Delete</a>
    <a class="btn btn-warning" href="#" id="editBtn">Edit</a>
    <span class="enrolled-span" id="likesSection">Liked ${totalLikes}</span>`
  } else {
    if(likesFromUser.length == 0){
        buttons.innerHTML = `<a class="btn btn-primary" href="#" id="likeBtn">Like</a>
        <span class="enrolled-span" id="likesSection" style="display : none">Liked ${totalLikes}</span>`;
    } else {
        buttons.innerHTML = `<a class="btn btn-primary" href="#" id="likeBtn" style="display : none">Like</a>
        <span class="enrolled-span" id="likesSection">Liked ${totalLikes}</span>`;
    }
  }

  movieDetailsSection.querySelector('.col-md-4').appendChild(buttons);
}

 /* --- Buttons Actions Functions */
async function onLike() {
   const res = await sendLike(currentMovieId);
    updateLikes()
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

async function updateLikes() {
    document.getElementById('likeBtn').disable = 'true';
    const likes = await getLikesNum(currentMovieId);
    const likesSection = document.getElementById('likesSection');
    likesSection.textContent = `Liked ${likes}`
    likesSection.style.display = '';
   document.getElementById('likeBtn').style.display = 'none';
}

/* --- Request Functions --- */

async function sendLike(id) {
    let res = await fetch('http://localhost:3030/data/likes', {
        method : 'post', 
        headers : {
            'Content-Type' : 'application/json',
            'X-Authorization': userData.token
        },
        body : JSON.stringify({movieId : id})
    });

    
    if(res.ok != true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
    
}

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
    const url = `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`
    const res = await fetch(url);

    if(res.ok != true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
}

async function getLikeFromUser(movieId) {
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