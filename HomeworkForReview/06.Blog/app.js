function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost);
}

attachEvents();

async function displayPost() {
    // get selected value from list
    // load post
    // load comments for the post
    // render data

    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const ulElement = document.getElementById('post-comments');

    postTitle.textContent = 'Loading...';
    postBody.textContent = '';
    ulElement.replaceChildren();

    const selectedId = document.getElementById('posts').value;

    const [ post, comments ] = await Promise.all([
        getPostById(selectedId),
        getCommentsByPostID(selectedId)
    ]);

    postTitle.textContent = post.title;
    postBody.textContent = post.body;

    comments.forEach(c => {
        const liElement = document.createElement('li');
        liElement.textContent = c.text;
        ulElement.appendChild(liElement);
    });
}

async function getAllPosts() {
    const url = 'http://localhost:3030/jsonstore/blog/posts';
    try {
        const res = await fetch(url);
        if(res.status != 200) {
            throw new Error('Post not found');
        }
        const data = await res.json();

        // parse data and populate list
        const selectElement = document.getElementById('posts');
        selectElement.replaceChildren();

        Object.values(data).forEach(p => {
            const optionElement = document.createElement('option');
            optionElement.textContent = p.title;
            optionElement.value = p.id;
            selectElement.appendChild(optionElement);
        });

    } catch (error) {
        alert(error.message);
    }
}

async function getCommentsByPostID(postID) {
    const url = 'http://localhost:3030/jsonstore/blog/comments';

    try {
        const res = await fetch(url);
        if(res.status != 200) {
            throw new Error('Comment not found');
        }
        const data = await res.json();

        const comments = Object.values(data).filter(c => c.postId == postID);

        return comments;

    } catch (error) {
        alert(error.message);
    }co
}

async function getPostById(postId) {
    const url = `http://localhost:3030/jsonstore/blog/posts/${postId}`;
    try {
        const res = await fetch(url);
        if(res.status != 200) {
            throw new Error('Post not found');
        }
        const data = await res.json();

        return data;

    } catch (error) {
        alert(error.message);
    }
}