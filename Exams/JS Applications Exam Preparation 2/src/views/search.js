import { getCarsByYear } from '../api/data.js';
import { html } from '../lib.js';

const searchTemplate = (onSubmit) => html`     <section id="search-cars">
<h1>Filter by year</h1>

<div class="container">
    <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
    <button class="button-list" @click=${onSubmit}>Search</button>
</div>`;


export function searchPage(ctx) {
    ctx.render(searchTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const year = Number(document.getElementById('search-input').value);

        if(isNaN(year) || year == 0) {
            return alert('Please enter a valid year');
        }
        
        ctx.page.redirect('/search/' + encodeURIComponent(year));
    }
}