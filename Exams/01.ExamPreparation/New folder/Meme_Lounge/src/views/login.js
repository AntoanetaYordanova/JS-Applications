import { login } from "../api/data.js";
import { html } from "../lib.js";
import { notify } from "../notify.js";

const loginTemplate = (onSubmit) => html`<section id="login">
<form id="login-form" @submit=${onSubmit}>
    <div class="container">
        <h1>Login</h1>
        <label for="email">Email</label>
        <input id="email" placeholder="Enter Email" name="email" type="text">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password">
        <input type="submit" class="registerbtn button" value="Login">
        <div class="container signin">
            <p>Dont have an account?<a href="/register">Sign up</a>.</p>
        </div>
    </div>
</form>
</section>`

export function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if(email == '' || password == ''){
            // alert('All fields are required');
            notify('All fields are required');
            return;
        }

        await login(password, email);
        ctx.updateNav();
        ctx.page.redirect('/memes');
    }
}