const tableEl = document.querySelector('table tbody');
const loadBooksBtn = document.getElementById('loadBooks');
const submitBtn = document.querySelector('#newBookForm button');
const saveBtn = document.querySelector('#editBookForm button')
const titleNewBookInput = document.querySelector('#newBookForm input[name = "title"]');
const authorNewBookInput = document.querySelector('#newBookForm input[name = "author"]');
const titleEditBookInput = document.querySelector('#editBookForm  input[name = "title"]');
const authorEditBookInput = document.querySelector('#editBookForm input[name = "author"]');
const formH3 = document.querySelector('form h3');

onLoad();

submitBtn.addEventListener('click', onSubmit);
saveBtn.addEventListener('click', onSave);   

loadBooksBtn.addEventListener('click', onLoad);

tableEl.addEventListener('click', (ev) => {
    if(ev.target.className == 'editBtn') {
        onEdit(ev);
    }

    if(ev.target.className == 'deleteBtn') {
        onDelete(ev);
    }
});

async function onSubmit() {   
    ev.preventDefault();
    const title = titleNewBookInput.value;
    const author = authorNewBookInput.value;
    
    if(title === '' || author === '') {
        return;
    }

    titleNewBookInput.value = '';
    authorNewBookInput.value = '';

    const response = await postData({author, title});

    const tr = createEl('tr', undefined, undefined, createEl('td', undefined, undefined, response.title), createEl('td', undefined, undefined, response.author), createEl('td', undefined, undefined, createEl('button', 'editBtn', response._id, 'Edit'), createEl('button', 'deleteBtn', response._id, 'Delete')));
    tableEl.appendChild(tr);
}

async function onLoad() {
    const booksData = await getData();

    tableEl.innerHTML = '';

    Object.entries(booksData).forEach(d => {
        const tr = createEl('tr', undefined, undefined, createEl('td', undefined, undefined, d[1].title), createEl('td', undefined, undefined, d[1].author), createEl('td', undefined, undefined, createEl('button', 'editBtn', d[0], 'Edit'), createEl('button', 'deleteBtn', d[0], 'Delete')));
        tableEl.appendChild(tr);
    });
}

async function onEdit(ev) {
    const id = ev.target.dataset.id;
    
    const {author, title} = await getDataByID(id);

    authorEditBookInput.value = author;
    titleEditBookInput.value = title;

    document.getElementById('editBookForm').style.display = 'block';
    document.getElementById('newBookForm').style.display = 'none';
    document.querySelector('#editBookForm input').name = id;
}

function onDelete(ev) {
    const id = ev.target.dataset.id;

}

function onSave(ev) {
    ev.preventDefault();
    
    const id = ev.target.parentElement.children[0].name;
    const author = authorEditBookInput.value;
    const title = titleEditBookInput.value;

    if(author == '' || title == '') {
        return;
    }
    
    putData(id, {author, title});

   onLoad();

}

function createEl(type, className, id, ...content) {
    const el = document.createElement(type);

    if(className !== undefined) {
        el.classList.add(className);
    }

    if(id !== undefined) {
        el.setAttribute('data-id', id);
    }

    content.forEach(c => {
        if(typeof c == 'string') {
            el.appendChild(document.createTextNode(c));
        } else {
            el.appendChild(c);
        }
    });

    return el;
}

async function getData() {
    const res = await fetch('http://localhost:3030/jsonstore/collections/books');
    const data = await res.json();

    return data;
}

async function putData(id, data) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;
    const res = await fetch(url, {
        method : 'put',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(data)
    });

    return await res.json();
}

async function postData(data) {
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const res = await fetch(url, {
        method : 'post',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(data)
    });

    return await res.json();
}

async function deleteData(id) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;
    const res = await fetch(url, {
        method : 'delete',
    });

    return await res.json();
}

async function getDataByID(id) {
    const res = await fetch('http://localhost:3030/jsonstore/collections/books/' + id);
    return await res.json();
}