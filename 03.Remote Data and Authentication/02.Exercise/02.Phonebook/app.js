function attachEvents() {
    const phonebookUl = document.getElementById('phonebook');
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');

    loadBtn.addEventListener('click', loadPhonebook);
    createBtn.addEventListener('click', createPhoneNum);

    async function loadPhonebook() {
        try {
            let phonebook = await getPhoneBook();
            phonebookUl.innerHTML = '';
            phonebook = Object.values(phonebook);
            phonebook.forEach(e => {
                const content = `${e.person}: ${e.phone}`;
                const li = createLi(e._id, content);
                const btn = createBtnEL();
                li.appendChild(btn);
            
                phonebookUl.appendChild(li);
            });
        } catch (er){
            phonebookUl.textContent = 'Error';
        }
       
    }
    
    async function createPhoneNum() {
        try {
            const personInput = document.getElementById('person');
            const phoneInput = document.getElementById('phone');

            const person = personInput.value;
            const phone = phoneInput.value;

            if(person == '' || phone == '') {
            return;
            }

            await postPhoneNum(person, phone);
            await loadPhonebook();
            
        } catch(er) {
            phonebookUl.textContent = 'Error';
        }
        
    }

    
    async function removePhoneNum(ev) {
      try{

        const id = ev.target.parentElement.id;   
        await deletePhone(id);
        await loadPhonebook();

      } catch(er) {
        phonebookUl.textContent = 'Error';
      }
    } 


    async function getPhoneBook() {
        const url = 'http://localhost:3030/jsonstore/phonebook';
   
        const res = await fetch(url);
        if(res.status !== 200) {
            throw new Error('Error');
        }
        const response = await res.json();

        return response;
    }


    async function postPhoneNum(person, phone) {
        const url = 'http://localhost:3030/jsonstore/phonebook';
        
        const options = {
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({person, phone})
        }

        const res = await fetch(url, options);
        if(res.ok !== true) {
            throw new Error('Error');
        }
        const response = await res.json();

        return response;
    }

    async function deletePhone(id) {
        const url = 'http://localhost:3030/jsonstore/phonebook/' + id;

        const res = await fetch(url, {method : 'delete'});
        if(res.ok !== true) {
            throw new Error('Error');
        }
        const result = await res.json();
        return result;
    }
    
    function createLi(id, content) {
        const li = document.createElement('li');
        li.textContent = content;
        li.id = id;
        return li;
    }
    
    function createBtnEL() {
        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.addEventListener('click', removePhoneNum);

        return btn;
    }
}

attachEvents();