function attachEvents() {
    const textarea = document.getElementById('messages');

    const sendBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');

    sendBtn.addEventListener('click', newMessage);
    refreshBtn.addEventListener('click', loadMessages);

    async function newMessage() {
        const nameInput = document.querySelector('input[name="author"]');
        const contentInput = document.querySelector('input[name="content"]');

        const author = nameInput.value;
        const content = contentInput.value;

        nameInput.value = '';
        contentInput.value = '';

        await postMessage(author, content);
    }

    async function loadMessages() {
        textarea.textContent = 'Loading...';
        let messages = await getMessages();
        textarea.textContent = '';

        messages = Object.values(messages);
        const printMsg = [];
        messages.forEach(e => {
            const {author, content} = e;
            printMsg.push(`${author}: ${content}`);
        });
        textarea.textContent = printMsg.join('\n');
    }

    async function postMessage(author, content) {
        const url = 'http://localhost:3030/jsonstore/messenger';

        const options = {
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({author, content})
        }

        const res = await fetch(url, options);
        const response = await res.json();

        return response;
    }

    async function getMessages() {
        const url = 'http://localhost:3030/jsonstore/messenger';
   
        const res = await fetch(url);
        const response = await res.json();

        return response;
    }
}

attachEvents();