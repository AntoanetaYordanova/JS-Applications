import { logout } from './api/data.js';
import {page, render} from './lib.js';
import { getUserData } from './util.js';
import { catalogPage } from './views/allMemes.js';
import { createMemePage } from './views/create.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { editPage } from './views/edit.js';
import { detailsPage } from './views/details.js';
import { userProfilePage } from './views/userProfile.js';

const root = document.querySelector('main');
updateNav();

page(decorateContext);

page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/all-memes', catalogPage);
page('/create-meme', createMemePage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/my-profile', userProfilePage);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root); 
    ctx.updateNav = updateNav;

    next();
}

async function updateNav() {
    const userData = await getUserData();

    if(userData != null) {
        document.getElementById('userGreeting').textContent = `Welcome, ${userData.email}`
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    updateNav();
    page.redirect('/');
});
