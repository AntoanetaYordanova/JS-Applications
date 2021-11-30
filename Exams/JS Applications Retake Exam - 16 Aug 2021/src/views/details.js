import { createComment, deleteGame, getComments, getGameDetails } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (data, userInfo, onDelete, onAdd, comments) => html`<section id="game-details">
<h1>Game Details</h1>
<div class="info-section">

    <div class="game-header">
        <img class="game-img" src=${data.imageUrl} />
        <h1>${data.title}</h1>
        <span class="levels">MaxLevel: ${data.maxLevel}</span>
        <p class="type">${data.category}</p>
    </div>

    <p class="text">
        ${data.summary}
    </p>

    ${comments.length == 0 
    ? html`<p class="no-comment">No comments.</p>` 
    : html`<div class="details-comments">
        <h2>Comments:</h2>
        <ul>
        ${comments.map(commentTemplate)}
        </ul>   
    </div>`}
    

    ${userInfo.isOwner 
        ? html` <div class="buttons">
        <a href="/edit/${data._id}" class="button">Edit</a>
        <a href="javascript:void(0)" class="button" @click=${onDelete}>Delete</a>
    </div>` 
    : null}
   
</div>

${!userInfo.isOwner && userInfo.isLogged 
? html`<article class="create-comment">
    <label>Add new comment:</label>
    <form class="form" @submit=${onAdd}>
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
</article>` 
: null}
</section>`

const commentTemplate = (comment) => html` <li class="comment">
<p>Content: ${comment.comment}</p>
</li>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const gameData = await getGameDetails(id)
    const userData = await getUserData();
    const userInfo = {
        isOwner : userData != null && userData.id == gameData._ownerId,
        isLogged : userData != null
    }
    const comments = await getComments(id);

    ctx.render(detailsTemplate(gameData, userInfo, onDelete, onAdd, comments));

    async function onDelete() {
        const confirmResponse = confirm('Are sure you want to delete this game?');

        if(confirmResponse) {
            await deleteGame(id);
            ctx.page.redirect('/');
        }
    }

    async function onAdd(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const comment = formData.get('comment');

        await createComment({
            gameId : id,
            comment
        });

        ev.target.reset();

    }
}

