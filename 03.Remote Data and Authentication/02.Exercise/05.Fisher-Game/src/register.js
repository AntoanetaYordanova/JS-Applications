const form = document.querySelector('form');
document.getElementById('logout').style.display = 'none';
document.getElementById('register').style.display = 'none';

form.addEventListener('submit', onSubmit);

async function onSubmit(ev) {
    try{
        ev.preventDefault();

        const data = new FormData(form);
        const email = data.get('email');
        const password = data.get('password');
        const rePass = data.get('rePass');

        if(email == '' || password == '' || rePass == '') {
            throw new Error('Please fill all input fileds');
        }
        
        if(password !== rePass) {
            throw new Error(`Passwords don't match`);
        }
        const response = await register({email, password});
        const token = response.accessToken;
        const userData = {
            email,
            id : response._id,
            token
        }
        
        localStorage.setItem('userData', JSON.stringify(userData));
        form.reset();

        window.location = 'homepage.html';

    } catch(er) {
        alert(er);
    }
}

async function register(data) {
    const url = 'http://localhost:3030/users/register';

    const res = await fetch(url, {
        method : 'post',
        headers : {
            'Content-Type' : 'application/json'
        } ,
        body : JSON.stringify(data)
    });

    if(res.ok !== true) {
        const response = await res.json();
        throw new Error(response.message);
    }
    
    const response = await res.json();

    return response;
}