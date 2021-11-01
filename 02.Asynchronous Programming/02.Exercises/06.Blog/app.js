 function attachEvents() {
    const select = document.getElementById('posts');
    const loadPostsBtn = document.querySelector('#btnLoadPosts');
    const viewBtn = document.querySelector('#btnViewPost');
    let postsIds = {};

    loadPostsBtn.addEventListener('click', loadPosts);
    viewBtn.addEventListener('click', view);

    async function loadPosts() {
        const postsResult = await fetch ('http://localhost:3030/jsonstore/blog/posts');
        const postsData = await postsResult.json();
        const entries = Object.entries(postsData);
        entries.forEach(e => {
            const title = e[1].title;
            postsIds[title] = {
                id : [e[0]],
                body : [e[1].body]
            };
            const option = document.createElement('option');
            option.textContent = title;
            select.appendChild(option);
        });
    }
    
    async function view() {
        const list = document.getElementById('post-comments');
        const title = select.value;
        const id = postsIds[title].id;
        const body = postsIds[title].body;

        const commentsResult = await fetch('http://localhost:3030/jsonstore/blog/comments');
        const commentsData = await commentsResult.json();
        const filteredComments = Object.entries(commentsData).filter(c => c[1].postId == id);
        
        document.getElementById('post-title').textContent = title;
        list.innerHTML = '';
        document.getElementById('post-body').textContent = body;
        console.log(filteredComments);
        filteredComments.forEach(c => {
            const li = document.createElement('li');
            li.id = c[1].id;
            li.textContent = c[1].text;
            list.appendChild(li);
        }); 
    }
}

attachEvents();