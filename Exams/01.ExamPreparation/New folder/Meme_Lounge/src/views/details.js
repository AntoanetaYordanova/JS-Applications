import { deleteMeme, getMemeById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (data, isCreator, onDelete) => html`<section id="meme-details">
<h1>Meme Title: ${data.title}

</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src=${data.imageUrl}>
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>
            ${data.description}
        </p>

        ${isCreator ? html`<a class="button warning" href="/edit/${data._id}">Edit</a> 
        <button class="button danger" @click=${onDelete}>Delete</button>` : null}
    </div>
</div>
</section>
`;

export async function detailsPage(ctx) {
    const memeData = await getMemeById(ctx.params.id);
    const userData = getUserData();
    const isCreator = userData && memeData._ownerId === userData.id;

    ctx.render(detailsTemplate(memeData, isCreator, onDelete));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this meme?');

        if(choise) {
            await deleteMeme(memeData._id);
            ctx.page.redirect('/memes');
        }
    }
}