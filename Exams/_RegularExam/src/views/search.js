import { html } from '../lib.js';

const template = (onClick) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onClick} class="button-list">Search</button>
    </div>  
</section>`;

export function searchPage(ctx) {
    ctx.render(template(onClick));

    async function onClick() {
        const searchAlbum = document.getElementById('search-input').value;

        if(searchAlbum == '') {
            return alert('Please enter an album.');
        }

        ctx.page.redirect(`/search/result/${searchAlbum}`);
    }
}