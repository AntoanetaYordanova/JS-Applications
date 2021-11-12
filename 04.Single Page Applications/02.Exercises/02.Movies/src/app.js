import { showHomePage } from "./homePage.js";
import {showLoginSection} from './login.js';
import {showSignUpSection} from './signUp.js';

document.getElementById('hidden').style.display = 'none';

showHomePage();

const navActions = {
    moviesLink : showHomePage,
    logoutBtn : logOut,
    loginLink : showLoginSection,
    registerLink : showSignUpSection
}

document.querySelector('nav').addEventListener('click', ev => {
    if(ev.target.tagName == 'A') {
        const action = navActions[ev.target.id];

        if(action != undefined) {
            action();
        }   
    }
});


function logOut() {
    localStorage.clear();
    resetNav()
    showLoginSection();
}

export function resetNav() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const logoutBtn = document.getElementById('logoutBtn');
    const addMovieBtn = document.querySelector('#add-movie-button');

    if(userData == null) {
        document.getElementById('greeting').textContent = `Welcome, email`;
        loginLink.style.display = '';
        registerLink.style.display = '';
        logoutBtn.style.display = 'none';
        if(addMovieBtn !== null) {
            addMovieBtn.style.display = 'none';
        }
    } else {
        document.getElementById('greeting').textContent = `Welcome, ${userData.email}`;
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        logoutBtn.style.display = '';
        if(addMovieBtn !== null) {
            addMovieBtn.style.display = '';
        }
    }
}