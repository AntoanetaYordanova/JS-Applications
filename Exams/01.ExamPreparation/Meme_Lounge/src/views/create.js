import { createMeme } from '../api/data.js';
import { html } from '../lib.js';

const template = (onSubmit) => html`<section id="create-meme">
<form id="create-form" @submit=${onSubmit}>
    <div class="container">
        <h1>Create Meme</h1>
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title">
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description"></textarea>
        <label for="imageUrl">Meme Image</label>
        <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
        <input type="submit" class="registerbtn button" value="Create Meme">
    </div>
</form>
</section>`;

export function createMemePage(ctx) {
    ctx.render(template(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);

        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        if(title == '' || description == '' || imageUrl == '') {
            return alert('All fields are required!');
        }

        const memeData = {
            title,
            description,
            imageUrl
        }

        createMeme(memeData);
        ctx.page.redirect('/all-memes');
    }
}