import { getUserMemes } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const template = (userData, memes) => html`<section id="user-profile-page" class="user-profile">
<article class="user-info">
    <img id="user-avatar-url" alt="user-profile" src="/images/${userData.gender}.png">
    <div class="user-content">
        <p>Username: ${userData.username}</p>
        <p>Email: ${userData.email}</p>
        <p>My memes count: ${memes.length}</p>
    </div>
</article>
<h1 id="user-listings-title">User Memes</h1>
<div class="user-meme-listings">
    ${memes.length == 0 ? html`<p class="no-memes">No memes in database.</p>` : memes.map(memeCardTemplate)}
</div>
</section>`;

const memeCardTemplate = (meme) => html`<div class="user-meme">
<p class="user-meme-title">${meme.title}</p>
<img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
<a class="button" href="/details/${meme._id}">Details</a>
</div>`;

export async function userProfilePage(ctx) {
   const userData = getUserData();
   const memesData = await getUserMemes(userData.id);

   ctx.render(template(userData, memesData));
}