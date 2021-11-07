const form = document.querySelector('form');
document.getElementById('logout').style.display = 'none';

form.addEventListener('submit', onSubmit);

async function onSubmit(ev) {
   try{
    ev.preventDefault();

    const data = new FormData(form);
    const email = data.get('email');
    const password = data.get('password');

    if(email == '' || password == '') {
        throw new Error('Please fill all input fileds');
    }

    const response = await login({email, password});
    const token = response.accessToken;
    const id = response._id;
    const userData = {
        email,
        token,
        id
    }

    localStorage.setItem('userData', JSON.stringify(userData));
    form.reset;

    window.location = 'homepage.html';
        
   } catch(er) {
    alert(er);
   }
}

async function login(data) {
    const url = 'http://localhost:3030/users/login';

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