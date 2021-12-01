import { deleteCarListing, getCarDetails } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const template = (car, isOwner, onDelete) => html`<section id="listing-details">
<h1>Details</h1>
<div class="details-info">
    <img src=${car.imageUrl}>
    <hr>
    <ul class="listing-props">
        <li><span>Brand:</span>${car.brand}</li>
        <li><span>Model:</span>${car.model}</li>
        <li><span>Year:</span>${car.year}</li>
        <li><span>Price:</span>${car.price}$</li>
    </ul>

    <p class="description-para">${car.description}</p>

    ${isOwner 
        ? html`<div class="listings-buttons">
        <a href="/edit/${car._id}" class="button-list">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
        </div>` 
        : null}
    
</div>
</section>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const carData = await getCarDetails(id);
    const userData = getUserData();
    const isOwner = userData && userData.id == carData._ownerId;
    ctx.render(template(carData, isOwner, onDelete));

    async function onDelete() {
        const confirmAnswer = confirm('Do you really want to dlete his listing?');
        
        if(confirmAnswer) {
            await deleteCarListing(id);
            ctx.page.redirect('/all-listings');
        }
    }
}