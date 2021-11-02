window.addEventListener('DOMContentLoaded', start);


async function start() {
    const mainEl = document.querySelector('main');

    const data = await getRecipes();
    mainEl.innerHTML = '';
    Object.values(data).forEach(v => {
        const imgEl = createEL('img');
        imgEl.src = v.img;
        const articleEl = createEL('article', 'preview', createEL('div', 'title', createEL('h2', undefined, v.name)), createEL('div', 'small', imgEl));
        articleEl.id = v._id;
        articleEl.addEventListener('click', showRecipe);
        mainEl.appendChild(articleEl);      
    });
}

async function showRecipe(ev) {
    const mainEl = document.querySelector('main');

   
    
    if(ev.target.tagName === 'ARTICLE') {
        const id = ev.target.id;
        ev.target.querySelector('h2').textContent = 'Loading...'
        const data = await getFullRecipe(id);

        if(data === 'Error') {
            ev.target.textContent = 'Error';
        }

        const imgEl = createEL('img');
        imgEl.src = data.img;

        const ulIngredients = createEL('ul');
        data.ingredients.forEach(i => ulIngredients.appendChild(createEL('li', undefined, i)));
        const articleEl = createEL('article', undefined, createEL('h2', undefined, data.name), createEL('div', 'band', createEL('div', 'thumb', imgEl)), createEL('div', 'ingredients', createEL('h3', undefined, 'Ingredients:'), createEL(ulIngredients)), createEL('div', 'description', createEL('h3', undefined, 'Preparation:')));
        
        mainEl.replaceChild(articleEl, ev.target);
    }
}

function createEL(type, className, ...content) {
    const el = document.createElement(type);

    if(className !== undefined) {
        el.classList.add(className);
    }

    content.forEach(c => {
        if(typeof c == 'string') {
            el.appendChild(document.createTextNode(c));
        } else {
            el.appendChild(c);
        }
    });

    return el;
}

async function getRecipes() {
    const resp = await fetch('http://localhost:3030/jsonstore/cookbook/recipes');
    return await resp.json();
}

async function getFullRecipe(id) {
    try {
        const resp = await fetch(`http://localhost:3030/jsonstore/cookbook/details/${id}`);
        return await resp.json();
    } catch(er) {
        return 'Error'
    }
}