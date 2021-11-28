import { render, page } from './lib.js';
import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { getUserData } from './util.js';
import { logout } from './api/data.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { userProfilePage } from './views/userProfile.js';


const root = document.querySelector('main'); 
document.getElementById('logoutBtn').addEventListener('click', onLogout);
updateNav();

page(decorateCtx);
page('/', homePage);
page('/memes', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/myProfile', userProfilePage);

page.start();

function decorateCtx(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

function updateNav() {
    const userData = getUserData();

    if(userData !== null) {
        document.getElementById('emailGreeting').textContent = `Welcome, ${userData.email}`;
        document.querySelector('nav div.user').style.display = 'block';
        document.querySelector('nav div.guest').style.display = 'none';
    } else {
        document.querySelector('nav div.user').style.display = 'none';
        document.querySelector('nav div.guest').style.display = 'block';
    }
}

async function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}