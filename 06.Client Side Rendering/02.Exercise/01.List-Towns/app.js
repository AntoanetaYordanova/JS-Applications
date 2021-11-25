import {html, render } from "./node_modules/lit-html/lit-html.js";

const form = document.querySelector('form');
const input = document.querySelector('input');
const rootDiv = document.getElementById('root');

form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    onSubmit();
});

function onSubmit(){
    const data = ((input.value)).split(',').map(e => e.trim());
    
    const template = html`
    <ul>
        ${data.map(d => html`<li>${d}</li>`)}
    </ul>`

    render(template, rootDiv);
}