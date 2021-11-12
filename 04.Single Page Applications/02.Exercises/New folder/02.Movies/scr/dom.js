const mainEl = document.querySelector('main');

export function showSection(section) {
    mainEl.replaceChildren(section);
}

export function e(type, attribute, className, ...content) {
    const el = document.createElement(type);

    for(let [key, value] of Object.entries(attribute)) {
        if(key.substring(0, 2) == 'on') {
            const event = key.substring(2).toLocaleLowerCase();
            el.addEventListener(event, value);
        } else if(key.substr(0, 4) === 'data') {
            const dataSet = key.substring(5);
            el.dataset[dataSet] = value;
        } {
            el[key] = value;
        }
    }

    if(className[0] !== undefined) {
        className.forEach(e => {
            el.classList.add(e);
        })
    }

    content.forEach(e => {
        if(typeof e === 'string') {
            el.appendChild(document.createTextNode(e));
        } else {
            el.appendChild(e);
        }
    });
   return el;
}

export function refreshNav() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const logoutBtn = document.getElementById('logoutBtn');
    const  greetingEl = document.getElementById('greeting');

    if(userData === null) {
        greetingEl.textContent = 'Welcome, email';
        loginLink.style.display = '';
        registerLink.style.display = '';
        logoutBtn.style.display = 'none';
    } else {
        greetingEl.textContent = `Welcome, ${userData.email}`;
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        logoutBtn.style.display = '';
    }
}