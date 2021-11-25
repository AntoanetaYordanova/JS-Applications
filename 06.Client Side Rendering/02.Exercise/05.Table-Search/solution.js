import {html, render} from './node_modules/lit-html/lit-html.js';
import { get } from './api.js';

const table = document.querySelector('table tbody');
const input = document.getElementById('searchField');

solve();

async function solve() {
   const allData = Object.values(await get('/jsonstore/advanced/table'));
   allData.forEach(d => d.match = false);

   updateTable(allData);
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      const match = input.value.trim();

      for(let d of allData) {
         const strMatch = (d.firstName + d.lastName + d.email + d.course).toLowerCase();
         if(match != '' && strMatch.includes(match)) {
            d.match = true;
         } else {
            d.match = false;
         }
      }

      updateTable(allData);
   }
}


async function updateTable(allData){
   const trTemplate = (data) => {
      return html`
       <tr class=${data.match ? 'select' : ''}>
         <td>${data.firstName} ${data.lastName}</td>
         <td>${data.email}</td>
         <td>${data.course}</td>
      </tr>`;
   }

   render(allData.map(trTemplate), table);
}
