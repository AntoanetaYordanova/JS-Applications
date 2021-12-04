import { searchAlbum } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const template = (albums, onClick, userData) => html`
<section id="searchPage">
    <h1>Search by Name</h1>
    
    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onClick} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    <div class="search-result">
        ${albums.length == 0 ? html`<p class="no-result">No result.</p>` : albums.map((album) => cardTemplate(album, userData))}   
    </div>
</section>`;

const cardTemplate = (album, userData) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${userData != null 
            ? html`<div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
            </div>` 
            : null}
        
    </div>
</div>`

export async function searchPage(ctx) {
    const album = ctx.querystring.split('=')[1];
    const albumsData = await searchAlbum(album);

    const userData = getUserData();

    ctx.render(template(albumsData, onClick, userData));

    async function onClick() {
        const searchAlbum = document.getElementById('search-input').value;

        if(searchAlbum == '') {
            return alert('Please enter an album.');
        }

        ctx.page.redirect(`/search?query=${encodeURIComponent(searchAlbum)}`);
    }
}