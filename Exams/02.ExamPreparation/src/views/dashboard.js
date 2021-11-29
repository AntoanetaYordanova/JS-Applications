import { getAllBooks } from '../api/data.js';
import { html } from '../lib.js';

const dashboardTemplate = (books) => html` <section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
<!-- Display ul: with list-items for All books (If any) -->
${books.length == 0 
    ? html`<p class="no-books">No books in database!</p>` 
    : html`<ul class="other-books-list">
    ${books.map(bookTemplate)}
    </ul>`}

<!-- Display paragraph: If there are no books in the database -->

</section>`;

const bookTemplate = (book) => html`<li class="otherBooks">
<h3>${book.title}</h3>
<p>Type: ${book.type}</p>
<p class="img"><img src=${book.imageUrl}></p>
<a class="button" href="/details/${book._id}">Details</a>
</li>`;

export async function dashboardPage(ctx) {
    const booksData = await getAllBooks();
    ctx.render(dashboardTemplate(booksData));
}