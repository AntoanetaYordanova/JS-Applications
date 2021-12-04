// import * as api from './api/data.js';
// window.api = api;

import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { catalogPage } from './views/catalog.js';
import { createPage } from "./views/create.js";
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/regiter.js";
import { searchPage } from './views/search.js';
import { searchResultPage } from "./views/searchResult.js";

const root = document.getElementById('main-content');

updateNav();

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create-album', createPage);
page('/catalog', catalogPage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/search', searchPage);
page('/search/result/:album', searchResultPage);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;

    next();
}

function updateNav() {
    const userData = getUserData();

    if(userData != null) {
        [...document.querySelectorAll('.user')].forEach(e => e.style.display = 'inline');
        [...document.querySelectorAll('.guest')].forEach(e => e.style.display ='none');
    } else {
        [...document.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(e => e.style.display = 'inline');
    }
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    updateNav();
    page.redirect('/');
});