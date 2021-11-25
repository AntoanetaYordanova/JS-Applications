import { getBooks, html, until } from "./utility.js";

const catalogTemplate = (booksPromise) =>  html`
<table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            ${until(booksPromise, html`
            <tr>
                <td colSpan="3">Loading&hellip;</td>
            </tr>`)}

        </tbody>
    </table>`

const bookRow = (book, onEdit) => html`
<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
        <button @click=${onEdit}>Edit</button>
        <button}>Delete</button>
    </td>
</tr>`


export function showCatalog(ctx) {
    return catalogTemplate(loadBooks());
}

async function loadBooks() {
    const books = await getBooks();

    return Object.values(books).map(book => bookRow(book, toggleEditor.bind(null, book)));
}

function toggleEditor(book) {
    
}