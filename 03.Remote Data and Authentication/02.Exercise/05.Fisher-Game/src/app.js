loadData()

const userData = JSON.parse(localStorage.getItem('userData'));
const loadBtn = document.querySelector('.load');
const addForm = document.getElementById('addForm');
const catchesDiv = document.getElementById('catches');

catchesDiv.addEventListener('click', (ev) => {
    if(ev.target.tagName == 'BUTTON') {
        if(ev.target.className == 'update') {
            onUpdate(ev);
        } else if(ev.target.className == 'delete') {
            onDelete(ev);
        }
    }
});
addForm.addEventListener('submit', onAdd);
loadBtn.addEventListener('click', loadData);
document.getElementById('user').addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
})

if(userData !== null) {
    document.querySelector('.email span').textContent = userData.email;
    document.getElementById('guest').style.display = 'none';
    document.getElementById('user').style.display = '';
    document.querySelector('#addForm button').removeAttribute('disabled');

} else {
    document.getElementById('user').style.display = 'none';
    document.getElementById('guest').style.display = '';
    document.querySelector('#addForm button').disabled = 'true';

}

async function onUpdate(ev) {
    try{
        const inputs = ev.target.parentElement.querySelectorAll('input');

        inputs.forEach(i => {
            if(i.value == '') {
               throw new Error('Please fill all input fields') 
            }
        });

        const angler = inputs[0].value;
        const weight = inputs[1].value;
        const species = inputs[2].value;
        const location = inputs[3].value;
        const bait = inputs[4].value;
        const captureTime = inputs[5].value;

        if(isNaN(Number(weight))) {
            throw new Error('Weight must be a number');
        }
        
        if(isNaN(Number(captureTime)) || !Number.isInteger(Number(captureTime))) {
            throw new Error('Capture Time must be an integer number');
        }

        const data = {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        }

        const id = ev.target.dataset.id;
        
        await putData(data, id);
        
    } catch(er) {
        alert(er)
    }    
    
}

async function onDelete(ev) {
    const id = ev.target.dataset.id;

    deleteData(id);
    ev.target.parentElement.remove();   
}

async function loadData() {
    try{
        const catchesSection = document.getElementById('catches');
        const data = await getData();
        catchesSection.replaceChildren(...data.map(addCatchEl));
        
    } catch(er) {
        alert(er);
    }
}

async function onAdd(ev) {
    ev.preventDefault(); 

    try{
        const catchData = new FormData(addForm);
        const angler = catchData.get('angler');
        const weight = catchData.get('weight');
        const species = catchData.get('species');
        const location = catchData.get('location');
        const bait = catchData.get('bait');
        const captureTime = catchData.get('captureTime');

        if(angler == '' ||
            weight == '' ||
            species == '' ||
            location == '' ||
            bait == '' ||
            captureTime == '') {
                throw new Error('Please fill all input fields');
            }

            if(isNaN(Number(weight))) {
                throw new Error('Weight must be a number');
            }
            
            if(isNaN(Number(captureTime)) || !Number.isInteger(Number(captureTime))) {
                throw new Error('Capture Time must be an integer number');
            }

            const data = {
                angler,
                weight,
                species,
                location,
                bait,
                captureTime
            }

            await post(data);
            addForm.reset();

    } catch(er) {
        alert(er)
    }

}

async function putData(data, id) {
    const url = 'http://localhost:3030/data/catches/' + id;
    const res = await fetch(url, {
        method : 'put',
        headers : {
            'Content-Type' : 'application/json',
            'X-Authorization': userData.token
        },
        body : JSON.stringify(data)
    });

    if(res.ok !== true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
}


async function post(data) {

    const res = await fetch('http://localhost:3030/data/catches', {
        method : 'post',
        headers : {
            'Content-Type' : 'application/json',
            'X-Authorization': userData.token
        },
        body : JSON.stringify(data)
    });

    if(res.ok !== true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
}

async function getData() {

    const res = await fetch('http://localhost:3030/data/catches');

    if(res.ok !== true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
}

async function deleteData(id) {
    const url = 'http://localhost:3030/data/catches/' + id;

    const res = await fetch(url, {
            method : 'delete',
            headers: {
                'X-Authorization': userData.token
            }
        }   
    );

    if(res.ok !== true) {
        const response = await res.json();
        throw new Error(response.message);
    }

    return await res.json();
}

function addCatchEl(data) {
    const el = document.createElement('div');
    el.classList.add('catch');
    const isOwner = (userData && userData.id == data._ownerId);

    el.innerHTML =  `<label>Angler</label>
    <input type="text" class="angler" value="${data.angler}" ${!isOwner ? 'disabled' : ''}>
    <label>Weight</label>
    <input type="text" class="weight" value="${data.weight}" ${!isOwner ? 'disabled' : ''}>
    <label>Species</label>
    <input type="text" class="species" value="${data.species}" ${!isOwner ? 'disabled' : ''}>
    <label>Location</label>
    <input type="text" class="location" value="${data.location}" ${!isOwner ? 'disabled' : ''}>
    <label>Bait</label>
    <input type="text" class="bait" value="${data.bait}" ${!isOwner ? 'disabled' : ''}>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${data.captureTime}" ${!isOwner ? 'disabled' : ''}>
    <button class="update" data-id="${data._id}"  ${!isOwner ? 'disabled' : ''}>Update</button>
    <button class="delete" data-id="${data._id}"  ${!isOwner ? 'disabled' : ''}>Delete</button>`
 ;
    return el;
}


