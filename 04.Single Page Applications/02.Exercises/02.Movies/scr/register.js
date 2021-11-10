import { showSection } from "./dom.js";
import { showHomepage } from "./showHomepage.js";

const section = document.querySelector('#form-sign-up');

const form = section.querySelector('form');
form.addEventListener('submit', onRegistration);

section.remove();

export function registration() {
    showSection(section);
}

async function onRegistration(ev) {
    ev.preventDefault();

    const data = new FormData(form);
    const email = data.get('email');
    const password = data.get('password');
    const rePass = data.get('repeatPassword');
    
    if(email === '' || password === '' || password.length < 6 || password !== rePass) {
        return;
    }

    let accessToken = '';
    let userId = '';

    try{
        const response = await register();
        accessToken = response.accessToken;
        userId = response._id;
        form.reset();

        const userData = {
            email,
            accessToken,
            userId
        }
    
        localStorage.setItem('userData', JSON.stringify(userData));
        
        showHomepage();

    } catch(er) {
        alert(er);
    }


    async function register() {
        const res = await fetch(' http://localhost:3030/users/register', {
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                email,
                password
            })
        });
    
        if(res.ok !== true) {
            const response = await res.json();
            throw new Error(response.message);
        }
    
        return await res.json();
    }
    
}



