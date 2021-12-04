import { logout } from './api/api.js';
import {page, render} from './lib.js';
import { getUserData } from './util.js';
import { allListingsPage } from './views/allListings.js';
import { createListingPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editListingPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { myListingsPage } from './views/myListings.js';
import { registerPage } from './views/register.js';
import { searchPage } from './views/search.js';
import { searchResponsePage } from './views/searchResponse.js';

const root = document.getElementById('site-content');
updateNav();

page(decorateContext);
page('/', homePage);
page('/all-listings', allListingsPage);
page('/by-year', searchPage);
page('/login', loginPage);
page('/register', registerPage);
page('/my-listings', myListingsPage);
page('/create', createListingPage);
page('/edit/:id', editListingPage);
page('/details/:id', detailsPage);
page('/search/:year', searchResponsePage);


page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root); 
    ctx.updateNav = updateNav;

    next();
}

async function updateNav() {
    const userData = await getUserData();

    if(userData != null) {
        document.getElementById('userGreeting').textContent = `Welcome ${userData.username}`
        document.getElementById('profile').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    updateNav();
    page.redirect('/');
});
