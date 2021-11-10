import { showSection } from "./dom.js";
import { showHomepage } from "./showHomepage.js";

const section = document.getElementById('form-login');
const form = section.querySelector('form');

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const data = new FormData(form);
    const email = data.get('email');
    const password = data.get('password');
    let accessToken = '';
    let userId = '';

    try{
        const response = await login();
        accessToken = response.accessToken;
        userId = response._id;

        const userData = {
            email,
            accessToken,
            userId
        }
    
        localStorage.setItem('userData', JSON.stringify(userData));

        form.reset();
        showHomepage();

    } catch(er) {
        alert(er)
    }


    async function login() {
        const res = await fetch(' http://localhost:3030/users/login', {
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
})

section.remove();

export function showLoginSection() {
    showSection(section);
}