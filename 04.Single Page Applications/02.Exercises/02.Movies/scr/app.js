import { showHomepage } from './showHomepage.js';
import { addMovie } from './addMovie.js';
import { showEditMovieSection } from './editMovie.js';
import { showLoginSection } from './login.js';
import { showMovieDetails } from './movieDetails.js';
import { registration } from './register.js';
import { refreshNav } from './dom.js'

showHomepage();

const nav = document.querySelector('#container nav');

const addMovieBtn = document.querySelector('#add-movie-button a');
addMovieBtn.addEventListener('click', addMovie);

const eventFunctions = {
    homePageLink : showHomepage,
    logoutBtn : logout,
    loginLink : showLoginSection,
    registerLink : registration
}



nav.addEventListener('click', (ev) => {
    const action = eventFunctions[ev.target.id];
    if(action !== undefined) {

        action();
    }
});


function logout() {
    localStorage.clear();
    showHomepage();
}









