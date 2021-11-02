 function attachEvents() {
    const select = document.getElementById('posts');
    const loadPostsBtn = document.querySelector('#btnLoadPosts');
    const viewBtn = document.querySelector('#btnViewPost');
    const postTitleEl = document.querySelector('#post-title');


    loadPostsBtn.addEventListener('click', loadPosts);
    viewBtn.addEventListener('click', view);

    async function loadPosts() { 
        const data = await getAllPosts();
        select.innerHTML = '';

        Object.values(data).forEach(e => {
            const option = document.createElement('option');
            option.textContent = e.title;
            option.value = e.id;
            select.appendChild(option);
        });
    }
    
    async function view() {
        const list = document.getElementById('post-comments');
        postTitleEl.textContent = 'Loading...'
        list.innerHTML = '';
        const [data, comments] = await Promise.all([getPostById(select.value), getCommentsById(select.value)]);
        console.log(data, comments);
        postTitleEl.textContent = data.title;
        comments.forEach(c => {
            const li = document.createElement('li');
            li.id = c.id;
            li.textContent = c.text;
            list.appendChild(li);
        }); 
    }

    async function getAllPosts() {
        const resp = await fetch(' http://localhost:3030/jsonstore/blog/posts');
        return await resp.json();
    }

    async function getPostById(id) {
        const data = await getAllPosts();
        return Object.values(data).filter(v => v.id == id)[0];
    }

    async function getCommentsById(id) {
        const resp = await fetch('http://localhost:3030/jsonstore/blog/comments');
        const data = await resp.json();
        return Object.values(data).filter(v => v.postId == id);
    }

}

attachEvents();