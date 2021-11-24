import { register } from "../api/api.js";

const section = document.getElementById('register');
section.remove();
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx;

export async function showRegisterPage(ctxTarget) {
    ctx = ctxTarget;
    ctx.showSection(section);
}

async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('repeatPassword');

    if(password !== repass) {
        alert(`Passwords don't match`);
    } else {
        await register(email, password);

        ctx.goTo('home');
        ctx.updateNav();
    }
}