import { showSection } from "./dom.js";
import { e } from "./dom.js";

const userData = JSON.parse(localStorage.getItem('userData'));
const section = document.getElementById('movie-example');
section.remove();
section.addEventListener('click', () => {
    
})

export async function showMovieDetails(movieId) {
    try{
        showSection(section);
        section.replaceChildren(e('p', {}, [], 'Loading...'));

        const movieData = await getMovieData(movieId);
        const ownerId = movieData._ownerId;
        const title = movieData.title;
        const imgUrl = movieData.img;
        const description = movieData.description;
        const likes = await getTotalLikes(movieId);

        const moviesLikedByOwner = await getMoviesLiked();
        let isLiked = false;

        if(moviesLikedByOwner.includes(title)) {
            isLiked = true;
        }

        const div = e('div', {}, ['container'], e('div', {}, ['row', 'bg-light', 'text-dark'], e('h1', {}, [], `Movie title: ${title}`), e('div', {}, ['col-md-8'], e('img', {src : imgUrl, alt : 'Movie'}, ['img-thumbnail'])), e('div', {}, ['col-md-4', 'text-center'], e('h3', {}, ['my-3'], 'Movie Description'), e('p', {}, [], description), e('a', {id : 'deleteBtn', href : '#'}, ['btn', 'btn-danger'], 'Delete'), e('a', {id : 'editBtn', href : '#'}, ['btn', 'btn-warning'], 'Edit'), e('a', {id : 'likeBtn', href : '#'}, ['btn', 'btn-primary'], 'Like'), e('span', {id : 'likesSection'}, ['enrolled-span'], `Liked ${likes}`))));
        section.replaceChildren(div);

        console.log(userData);
       if(userData.userId == ownerId) {
            section.querySelector('#likeBtn').style.display = 'none';
       } else {
            section.querySelector('#deleteBtn').style.display = 'none';
            section.querySelector('#editBtn').style.display = 'none';
       }

    } catch(er) {
        alert(er);
    }
}

 async function getMovieData(id) {
    const url = 'http://localhost:3030/data/movies/' + id;
    const resp = await fetch(url);

    if(resp.ok !== true) {
        const response = await resp.json();
        throw new Error(response.message);
    }

    return await resp.json();
}

async function getTotalLikes(id) {
    const url = `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`;
    const resp = await fetch(url);

    if(resp.ok !== true) {
        const response = await resp.json();
        throw new Error(response.message);
    }

    return await resp.json();
}

async function getMoviesLiked(movieId, userId) {
    const url = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`;
    const resp = await fetch(url);

    if(resp.ok !== true) {
        const response = await resp.json();
        throw new Error(response.message);
    }

    return await resp.json();
}