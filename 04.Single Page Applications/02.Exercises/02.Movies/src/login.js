import { showHomePage } from "./homePage.js";

const loginSection = document.getElementById('form-login');
const main = document.getElementById('main');
const form = loginSection.querySelector('form');

export function showLoginSection() {
    main.replaceChildren(loginSection);
}

form.addEventListener('submit', onRegister);

async function onRegister(ev) {
    ev.preventDefault();

    try {
        const data = new FormData(form);
        const email = data.get('email');
        const password = data.get('password');

        if(email == '' || password == '') {
            throw new Error('Please fill all inputs fields');
        }

        const newData = await login({email, password});
        const token = newData.accessToken;
        const userId = newData._id;
        localStorage.setItem('userData', JSON.stringify({token, userId, email}));

        form.reset();
        showHomePage();
    } catch (er) {
        alert(er);    
    }
}

async function login(data) {
    const url = 'http://localhost:3030/users/login';
    const res = await fetch(url, {
        method : 'post',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    });

    if(res.ok != true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
}
