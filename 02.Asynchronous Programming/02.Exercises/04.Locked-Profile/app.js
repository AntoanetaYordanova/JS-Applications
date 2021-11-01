async function lockedProfile() {
    const usersResponse = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    const usersData = await usersResponse.json();
    const usersKeys = Object.keys(usersData);
    const mainEl =  document.getElementById('main');
    mainEl.innerHTML = '';

    usersKeys.forEach(u => {
        const currentUser = usersData[u];
        const divEl = document.createElement('div');
        divEl.classList.add('profile');
        divEl.innerHTML = `<img src="./iconProfile2.png" class="userIcon" /><label>Lock</label><input type="radio" name="user1Locked" value="lock" checked><label>Unlock</label><input type="radio" name="user1Locked" value="unlock"><br><hr><label>Username</label><input type="text" name="user1Username" value="${currentUser.username}" disabled readonly /><div id="user1HiddenFields"><hr><label>Email:</label><input type="email" name="user1Email" value="${currentUser.email}" disabled readonly /><label>Age:</label><input type="email" name="user1Age" value="${currentUser.age}" disabled readonly />`;
        const buttonEl = document.createElement('button');
        buttonEl.textContent = 'Show more';
        buttonEl.addEventListener('click', showHideInfo);
        divEl.appendChild(buttonEl);
        mainEl.appendChild(divEl);
    });

    function showHideInfo(ev) {
        const radioInput = ev.target.parentElement.querySelector('input:nth-child(5)');
        if(radioInput.checked) {
            if(ev.target.textContent === 'Show more') {
                ev.target.textContent = 'Hide it';
                ev.target.previousSibling.style.display = 'inline';
            } else {
                ev.target.textContent = 'Show more';
                ev.target.previousSibling.style.display = 'none';
            }
        }
    }
}