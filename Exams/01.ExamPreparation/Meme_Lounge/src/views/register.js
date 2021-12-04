import { register } from '../api/data.js';
import { html } from '../lib.js';

const template = (onSubmit) => html`       <section id="register">
<form id="register-form" @submit=${onSubmit}>
    <div class="container">
        <h1>Register</h1>
        <label for="username">Username</label>
        <input id="username" type="text" placeholder="Enter Username" name="username">
        <label for="email">Email</label>
        <input id="email" type="text" placeholder="Enter Email" name="email">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password">
        <label for="repeatPass">Repeat Password</label>
        <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
        <div class="gender">
            <input type="radio" name="gender" id="female" value="female">
            <label for="female">Female</label>
            <input type="radio" name="gender" id="male" value="male" checked>
            <label for="male">Male</label>
        </div>
        <input type="submit" class="registerbtn button" value="Register">
        <div class="container signin">
            <p>Already have an account?<a href="#">Sign in</a>.</p>
        </div>
    </div>
</form>
</section>`;

export function registerPage(ctx) {
    ctx.render(template(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);

        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        const rePass = formData.get('repeatPass');
        const gender = formData.get('gender');

        if(email == '' || username == '' || password == '') {
            return alert('All fields are required!');
        }

        if(password != rePass) {
            return alert('Passwords don\'t match!');
        }

        await register(username, email, password, gender);
        ctx.updateNav();
        ctx.page.redirect('/all-memes');
    }
}