const section = document.getElementById('create');
section.remove();
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let ctx;

export async function showCreatePage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section);
}

async function onSubmit(ev) {
    ev.preventDefault();
}