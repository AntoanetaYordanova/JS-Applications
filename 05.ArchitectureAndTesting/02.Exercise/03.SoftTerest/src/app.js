import { showHomePage } from "./views/home.js";
import { showCreatePage } from './views/create.js';
import { showLoginPage } from "./views/login.js";
import { showRegisterPage } from './views/register.js';
import { showDashboardPage } from './views/dashboard.js';
import { showDetailsPage } from "./views/details.js";
import { showSection } from "./dom.js";


const links = {
    getStartedLink : 'home',
    homeLink : 'home',
    dashboardLink : 'catalog',
    loginPageLink : 'login',
    registerPageLink : 'register',
    createPageLink : 'create'
}

const views = {
    home : showHomePage,
    catalog : showDashboardPage,
    login : showLoginPage,
    register : showRegisterPage,
    create : showCreatePage,
    details : showDetailsPage
}

const ctx = {
    goTo,
    showSection,
    updateNav
}

const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigate);

function onNavigate(ev) {
    const name = links[ev.target.id];

    if(name) {
        ev.preventDefault();
        goTo(name);
    }
}

function goTo(name, ...params) {
    const view = views[name];

    if(typeof view == 'function') {
        view(ctx, ...params);
    }
}

function updateNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if(userData != null) {
        [...document.querySelectorAll('.user')].forEach(l => l.style.display = 'block');
        [...document.querySelectorAll('.guest')].forEach(l => l.style.display = 'none');
    } else {
        [...document.querySelectorAll('.user')].forEach(l => l.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(l => l.style.display = 'block');
    }
} 

updateNav();
goTo('home');
