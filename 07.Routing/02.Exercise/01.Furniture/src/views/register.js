import { register } from "../api/api.js";
import { html } from "../lib.js";

const registerTemplate = (onRegister, errorMsg, errors) => {
  return html` <div class="row space-top">
  <div class="col-md-12">
      <h1>Register New User</h1>
      <p>Please fill all fields.</p>
  </div>
</div>
<form @submit=${onRegister}>
  <div class="row space-top">
    ${errorMsg ? html`<div class="form-group error">${errorMsg}</div>` : ''}
      <div class="col-md-4">
          <div class="form-group">
              <label class="form-control-label" for="email">Email</label>
              <input class=${'form-control ' + (errors.email ? 'is-invalid' : '')} id="email" type="text" name="email">
          </div>
          <div class="form-group">
              <label class="form-control-label" for="password">Password</label>
              <input class=${'form-control ' + (errors.password ? 'is-invalid' : '')} id="password" type="password" name="password">
          </div>
          <div class="form-group">
              <label class="form-control-label" for="rePass">Repeat</label>
              <input class=${'form-control ' + (errors.repass ? 'is-invalid' : '')} id="rePass" type="password" name="rePass">
          </div>
          <input type="submit" class="btn btn-primary" value="Register" />
      </div>
  </div>
</form>`;
}

export function registerPage(ctx) {
  update();

  function update(errorMsg, errors = {}) {
    ctx.render(registerTemplate(onRegister, errorMsg, errors));  
  }

  async function onRegister(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repass = formData.get('rePass').trim();
  
    try {
      if(email == '' || password == '' || repass == '') {
        throw {
          error :  new Error('All fields are required'),
          errors : {
            email : email == '',
            password : email == '',
            repass : repass == ''
          }
        }
      }

      if(password !== repass) {
        throw{
          error : new Error('Passwords don\'t match'),
          errors : {
            password : true,
            repass : true
          }
        }
      }
      await register(password, email);
      ctx.updateUserNav();
      ctx.page.redirect('/');
    } catch (err) {
      const message = err.message || err.error.message;
      update(message, err.errors || {});
    }
  }
}

