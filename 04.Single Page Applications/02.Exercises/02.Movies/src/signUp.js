import { showHomePage } from "./homePage.js";

const signUpSection = document.getElementById('form-sign-up');
const main = document.getElementById('main');
const form = signUpSection.querySelector('form');
const greetingSection = document.getElementById('greeting');


export function showSignUpSection() {
    greetingSection.style.display = 'none';
    main.replaceChildren(signUpSection);
}

form.addEventListener('submit', onRegister);

async function  onRegister(ev) {
    ev.preventDefault();
    try {  
        const data = new FormData(form);
        const email = data.get('email');
        const password = data.get('password');
        const rePass = data.get('repeatPassword');

        if(email == '' || password == '' || rePass == '') {
            throw new Error('Please fill all input fields');
        }

        if(password.length < 6 ) {
            throw new Error('Password must be at leat 6 characters');
        }

        if(password !== rePass) {
            throw new Error(`Passwords don't match`);
        }

        const newData = await signUp({email, password});
        const token  = newData.accessToken;
        const userId = newData._id;
        
        localStorage.setItem('userData', JSON.stringify({token, userId, email}));

        form.reset();
        showHomePage();
    } catch (error) {
        alert(error)
    }
}

async function signUp(data) {
    const url = 'http://localhost:3030/users/register';
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
