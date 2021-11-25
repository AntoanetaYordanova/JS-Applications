import {html, render} from './node_modules/lit-html/lit-html.js';
import { towns as townNames} from './towns.js';

const listTemplate = (towns) => {
  return html`
   <ul>
      ${towns.map(t => html`<li class=${t.match ? 'active' : null}>${t.name}</li>`)}
   </ul>`
}

const towns = townNames.map(t => ({name : t, match : false}));
const root = document.getElementById('towns');
const input = document.getElementById('searchText');
const output = document.getElementById('result');
document.querySelector('button').addEventListener('click', onSearch);

update();

function update() {
   render(listTemplate(towns), root);
}

function onSearch() {
   const match = input.value.toLocaleLowerCase();
   let matches = 0;
   for(let t of towns) {
      if(match && t.name.toLocaleLowerCase().trim().includes(match)) {
         matches++;
         t.match = true;
      } else {
         t.match = false;
      }
   }
   update();
   output.textContent = matches;
}