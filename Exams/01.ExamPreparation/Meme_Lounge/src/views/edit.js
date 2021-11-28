import { editMeme, getMemeById } from "../api/data.js";
import { html } from "../lib.js";
import { notify } from "../notify.js";


const editTemplate = (onSubmit, data) => html`<section id="create-meme">
<section id="edit-meme">
            <form id="edit-form" @submit=${onSubmit}>
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" .value=${data.title}>
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description">
                            ${data.description}
                        </textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${data.imageUrl}>
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>`

export async function editPage(ctx) {
    const memeData = await getMemeById(ctx.params.id);

    ctx.render(editTemplate(onSubmit, memeData));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        if(title == '' || description == '' || imageUrl == '') {
            // return alert('All fields are required!');
            notify('All fields are required!');
        }

        await editMeme(memeData._id, {title, description, imageUrl});

        ctx.page.redirect('/memes');
    }
}