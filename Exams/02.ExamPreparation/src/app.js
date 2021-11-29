import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { addBookPage } from "./views/addBook.js";
import {dashboardPage} from './views/dashboard.js'
import { detailsPage } from "./views/details.js";
import { editBookPage } from "./views/editBook.js";
import { loginPage } from "./views/login.js";
import { myBooksPage } from "./views/myBooks.js";
import { registerPage } from "./views/regPage.js";

const root = document.getElementById('site-content');

updateNav();

page(decorateContext);
page('/', dashboardPage);
page('/dashboard', dashboardPage);
page('/login', loginPage);
page('/register', registerPage);
page('/my-books', myBooksPage);
page('/add-book', addBookPage);
page('/edit/:id', editBookPage);
page('/details/:id', detailsPage)

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;

    next();
}

function updateNav() {
    const userData = getUserData();

    if(userData != null) {
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';    
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';  
    }
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    updateNav();
    page.redirect('/dashboard');
});