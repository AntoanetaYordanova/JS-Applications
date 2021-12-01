import { getCarsByYear } from '../api/data.js';
import { html } from '../lib.js';

const searchTemplate = (onSubmit) => html`     <section id="search-cars">
<h1>Filter by year</h1>

<div class="container">
    <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
    <button class="button-list" @click=${onSubmit}>Search</button>
</div>`;

const resultTemplate = (cars, onSubmit) => html`<section id="search-cars">
<h1>Filter by year</h1>

<div class="container">
    <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
    <button class="button-list" @click=${onSubmit}>Search</button>
</div>

<h2>Results:</h2>
<div class="listings">
    ${cars.length == 0 ? html`<p class="no-cars"> No results.</p>` : cars.map(carTemplate)}
</div>
</section>`;

const carTemplate = (car) => html`<div class="listing">
<div class="preview">
    <img src=${car.imageUrl}>
</div>
<h2>${car.brand} ${car.model}</h2>
<div class="info">
    <div class="data-info">
        <h3>Year: ${car.year}</h3>
        <h3>Price: ${car.price} $</h3>
    </div>
    <div class="data-buttons">
        <a href="/details/${car._id}" class="button-carDetails">Details</a>
    </div>
</div>
</div>`;

export function searchPage(ctx) {
    ctx.render(searchTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const year = Number(document.getElementById('search-input').value);

        if(isNaN(year) || year == 0) {
            return alert('Please enter a valid year');
        }

        const carsData = await getCarsByYear(year);

        ctx.render(resultTemplate(carsData, onSubmit));
    }
}