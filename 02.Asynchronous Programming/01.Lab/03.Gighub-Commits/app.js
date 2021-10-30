function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const list = document.getElementById('commits');

    getData();

    async function getData() {
       try{
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
        
        if(response.ok == false) {
         throw new Error(`${response.status} ${response.statusText}`);   
        }

        const data = await response.json();
        data.forEach(d => {
            const li = document.createElement('li');
            li.textContent = `${d.commit.author.name}: ${d.commit.message}`;
            list.appendChild(li);
        });
       } catch(e) {
        const li = document.createElement('li');
        li.textContent = e.message;
        list.appendChild(li);
       }
    }
}