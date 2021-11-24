import {createIdea, getAllIdeas} from '../api/data.js'
import { e } from '../dom.js';

const section = document.getElementById('dashboard-holder');
section.remove();


export async function showDashboardPage(ctx) {
    ctx.showSection(section);
    loadIdeas();
}

async function loadIdeas() {
    const ideas = await getAllIdeas();
    const fragment = document.createDocumentFragment();

    if(ideas.length == 0) {
        const element = e('h1', {}, 'No ideas yet! Be the first one :)');
        section.appendChild(element)
    } else {
        ideas.map(createIdeaCard).forEach(i => fragment.appendChild(i));
        section.replaceChildren(fragment);
    }
}

function createIdeaCard(idea) {
    const element = e('div', {className : "card overflow-hidden current-card details"})
    element.style.width = '20rem';
    element.style.hight = '18rem';

    element.innerHTML = `
    <div class="card-body">
    <p class="card-text">${idea.title}</p>
    </div>
    <img class="card-image" src="${idea.img}" alt="Card image cap">
    <a data-id="${idea._id}" class="btn" href="">Details</a>`;

    return element;
}
