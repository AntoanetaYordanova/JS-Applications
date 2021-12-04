import { editMeme, getMemeDetails } from '../api/data.js';
import { html } from '../lib.js';

const template = (meme, onSubmit) => html`<section id="edit-meme">
<form id="edit-form" @submit=${onSubmit}>
    <h1>Edit Meme</h1>
    <div class="container">
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description">
                ${meme.description}
            </textarea>
        <label for="imageUrl">Image Url</label>
        <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
        <input type="submit" class="registerbtn button" value="Edit Meme">
    </div>
</form>
</section>`;

export async function editPage(ctx) {
    const memeId = ctx.params.id;
    const memeData = await getMemeDetails(memeId);
    ctx.render(template(memeData, onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        
       const formData = new FormData(ev.target);

       const title = formData.get('title');
       const description = formData.get('description');
       const imageUrl = formData.get('imageUrl');

       if(title == '' || description == '' || imageUrl == '') {
           return alert('All fields are required!');
       }

       const newData = {
           title, 
           description,
           imageUrl
       }

       await editMeme(memeId, newData);
       ctx.page.redirect('/details/' + memeId);
    }
}