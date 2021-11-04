const form = document.getElementById('form');
loadTableContent();

form.addEventListener('submit', submitForm);

async function submitForm(ev) {
    ev.preventDefault();

    try{
        const firstNameInput = document.querySelector('input[name="firstName"]');
        const lastNameInput = document.querySelector('input[name="lastName"]');
        const facultyNumberInput = document.querySelector('input[name="facultyNumber"]');
        const gradeInput = document.querySelector('input[name="grade"]');

        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const facultyNumber = facultyNumberInput.value;
        const grade = gradeInput.value;

        if(firstName == '' || lastName == '' || facultyNumber == '' || grade == '' || isNaN(Number(facultyNumber))) {
            return
        }

        await postStudent(firstName, lastName, facultyNumber, grade);
        loadTableContent();

    } catch(er) {
        document.querySelector('.container-form').appendChild(document.createTextNode('Error'));
    }
}

async function loadTableContent() {
    const table = document.querySelector('#results tbody');
    let info = await getStudentsInfo();
    info = Object.values(info);

    table.innerHTML = '';
    info.forEach(e => {
        const tr = createEl('tr', createEl('td', e.firstName), createEl('td', e.lastName), createEl('td', e.facultyNumber), createEl('td', e.grade));
        table.appendChild(tr);
    });
    
}

function createEl(type, ...content) {
    const el = document.createElement(type);

    content.forEach(c => {
        if(typeof c === 'string' || typeof c ===  'number') {
            el.appendChild(document.createTextNode(c));
        } else {
            el.appendChild(c);
        }
    });

    return el;
}

async function postStudent(firstName, lastName, facultyNumber, grade) {
    const url = 'http://localhost:3030/jsonstore/collections/students';
    
    const options = {
        method : 'post',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({firstName, lastName, facultyNumber, grade})
    }

    const res = await fetch(url, options);
    if(res.ok !== true) {
        throw new Error('Error');
    }
    const response = await res.json();

    return response;
}

async function getStudentsInfo() {
    const url = 'http://localhost:3030/jsonstore/collections/students';

    const res = await fetch(url);
    if(res.status !== 200) {
        throw new Error('Error');
    }
    const response = await res.json();

    return response;
}




