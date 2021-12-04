import { login } from '../api/data.js';
import { html } from '../lib.js';

const template = (onSubmit) => html` <section id="login">
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
</section>`;

export function loginPage(ctx) {
    ctx.render(template(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);

        const email = formData.get('email');
        const password = formData.get('password');

        await login(email, password)
        ctx.updateNav();
        ctx.page.redirect('/all-memes');
    }
}