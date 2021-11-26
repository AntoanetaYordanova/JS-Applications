import { page, render } from "./lib.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { html } from './lib.js';

const root = document.querySelector('div.container');

page(decorateContext);
page('/', catalogPage);
page('/create', createPage);
page('/edit', editPage);
page('/details/:id', detailsPage);
page('/login', loginPage);
page('/register', registerPage);
page('/my-furniture', catalogPage);
page.start();

function decorateContext(ctx, next) {
    ctx.render = () => render(html`<h1>Probe</h1>`, root);
    next()
}