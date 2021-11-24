const section = document.getElementById('home');
section.remove();
section.querySelector('#getStartedLink').addEventListener('click', (ev) => {
    ev.preventDefault();
    ctx.goTo('catalog');
});

let ctx;

export async function showHomePage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section);
}