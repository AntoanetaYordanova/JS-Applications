import { deleteMeme, getMemeDetails } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const template = (meme, isCreator, onDelete) => html`<section id="meme-details">
<h1>Meme Title: ${meme.title}

</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src=${meme.imageUrl}>
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>
            ${meme.description}
        </p>
        ${isCreator 
        ? html` <a class="button warning" href="/edit/${meme._id}">Edit</a>
        <button class="button danger" @click=${onDelete}>Delete</button>` 
        : null} 
    </div>
</div>
</section>`;

export async function detailsPage(ctx) {
    const memeId = ctx.params.id;
    const memeData = await getMemeDetails(memeId);
    const userData = getUserData();
    const isCreator = userData && userData.id == memeData._ownerId;

    ctx.render(template(memeData, isCreator, onDelete));

    async function onDelete() {
        const confirmResponse = confirm('Are you sure you want to delete this meme?');

        if(confirmResponse) {
            deleteMeme(memeId);
            ctx.page.redirect('/all-memes');
        }
    }
}