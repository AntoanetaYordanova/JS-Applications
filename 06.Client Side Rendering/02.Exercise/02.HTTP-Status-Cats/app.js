import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats as catsData} from "./catSeeder.js";

catsData.forEach(c => c.info = false);
const template = (catData) => {
  return  html`
<li>
    <img src=${'./images/' + catData.imageLocation + '.jpg'} width="250" height="250" alt="Card image cap">
    <div class="info">
        <button @click=${() => toggleInfo(catData)} class="showBtn">${catData.info ? 'Hide status code' : 'Show status code'}</button>
       ${catData.info ? html`<div class="status"  id=${catData.id}>
            <h4>Status Code: ${catData.statusCode}</h4>
            <p>${catData.statusMessage}</p>
        </div>` : null}
    </div>
</li>`
}

const root = document.getElementById('allCats');
update();

function update() {
    const cats = html`
<ul>
    ${catsData.map(template)}
</ul>`;
render(cats, root);
}

function toggleInfo(cat) {
    cat.info = !cat.info;
    update();
}