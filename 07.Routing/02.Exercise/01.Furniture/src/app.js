import { page, render } from "./lib.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./api/api.js";
import { isUserLogged } from "./util.js";

const root = document.querySelector('div.container');
document.getElementById('logoutBtn').addEventListener('click', onLogOut);

page(decorateContext);
page('/', catalogPage);
page('/create', createPage);
page('/edit', editPage);
page('/details/:id', detailsPage);
page('/login', loginPage);
page('/register', registerPage);
page('/my-furniture', catalogPage);
page.start();

updateUserNav();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

async function onLogOut() {
    await logout();
    updateUserNav();
    page.redirect('/');
}

function updateUserNav() {
    if(isUserLogged()) {
        console.log('logged');
       document.getElementById('user').style.display = 'inline-block';
       document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}
