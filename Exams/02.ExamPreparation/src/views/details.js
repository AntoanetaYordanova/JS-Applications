import { deleteBook, getBookDetails, getTotalLikes, isBookLikedByUser, sendLike } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (data, isOwner, isLoggedUser, onDelete, likes, onLike, isLiked) => html` <section id="details-page" class="details">
<div class="book-information">
    <h3>${data.title}</h3>
    <p class="type">Type: ${data.type}</p>
    <p class="img"><img src=${data.imageUrl}></p>
    <div class="actions">

        ${isOwner ? html`<a class="button" href="/edit/${data._id}">Edit</a>
        <a @click=${onDelete} class="button" href="#">Delete</a>` : null}
        

        <!-- Bonus -->
        <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
        ${isLoggedUser && !isOwner && !isLiked? html `<a class="button" href="#" @click=${onLike} >Like</a>` : null}
        
        <!-- ( for Guests and Users )  -->
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: ${likes}</span>
        </div>
        <!-- Bonus -->
    </div>
</div>
<div class="book-description">
    <h3>${data.title}</h3>
    <p>${data.description}</p>
</div>
</section>`

export async function detailsPage(ctx) {
    const bookData = await getBookDetails(ctx.params.id);
    const userData = getUserData();
    const likes = await getTotalLikes(bookData._id);
    let isLiked;

    if(userData !== null) {
        isLiked = await isBookLikedByUser(userData.id, bookData._id);
    } else {
        isLiked = false;
    }

    console.log(isLiked);

    const isOwner = userData && userData.id == bookData._ownerId;
    ctx.render(detailsTemplate(bookData, isOwner, userData != null, onDelete, likes, onLike, isLiked));

    function onLike(ev) {
        ev.preventDefault();
        sendLike();
        updateLikesSpan();
        ev.target.style.display = 'none';
    }

    async function updateLikesSpan() {
        const newLikes = await getTotalLikes(bookData._id);;
        document.getElementById('total-likes').textContent = `Likes: ${newLikes}`;
    }

    async function onDelete(ev) {
        ev.preventDefault();
        deleteBook(bookData._id);
        ctx.page.redirect('/');
    }
}