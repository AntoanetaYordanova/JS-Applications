function lockedProfile() {

    getAllProfiles();

    document.getElementById(`main`).addEventListener(`click`, onToggle);
 
    function onToggle(event) {
        const button = event.target;
        const profile = button.parentNode;
        const moreInformation = profile.getElementsByTagName(`div`)[0];
        const lockStatus = profile.querySelector(`input[type="radio"]:checked`).value;
 
        if (lockStatus === `unlock`) {
            if (button.textContent === `Show more`) {
                moreInformation.style.display = `inline-block`;
                button.textContent = `Hide it`;
            } else if (button.textContent === `Hide it`) {
                moreInformation.style.display = `none`;
                button.textContent = `Show more`;
            }
        }
    }

    async function getAllProfiles() {
        const url = 'http://localhost:3030/jsonstore/advanced/profiles';

        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Error');
            }

            const data = await res.json();

            Object.values(data).forEach(profile => {
                createProfileCard(profile);
            })
        } catch (err) {
            alert(err.message) 
        }
    }

    function createProfileCard(profile) {

        const usernameInput = e('input', { type: 'text', value: `${profile.username}` });
        const emailInput = e('input', { type: 'text', value: `${profile.email}` });
        const ageInput = e('input', { type: 'text', value: `${profile.age}` });
        const lockedRadio = e('input', { type: 'radio', value: 'lock' });
        const unlockedRadio = e('input', { type: 'radio', value: 'unlock' });

        const profileDiv = e('div', { className: 'profile' },
            e('img', { src: './iconProfile2.png', className: 'userIcon' }),
            e('label', {}, 'Lock'),
            lockedRadio,
            e('label', {}, 'Unlock'),
            unlockedRadio,
            e('br'),
            e('hr'),
            e('label', {}, 'Username'),
            usernameInput,
            e('div', { className: 'user1HiddenFields' },
                e('hr'),
                e('label', {}, 'Email:'),
                emailInput,
                e('label', {}, 'Age:'),
                ageInput,
            ),
            e('button', {}, 'Show more')
        );

        lockedRadio.setAttribute('checked', true);
        usernameInput.setAttribute('disabled', true);
        usernameInput.setAttribute('readonly', true);
        emailInput.setAttribute('disabled', true);
        emailInput.setAttribute('readonly', true);
        ageInput.setAttribute('disabled', true);
        ageInput.setAttribute('readonly', true);

        document.getElementById('main').appendChild(profileDiv);
    }

    function e(type, attr, ...content) {
        const element = document.createElement(type);

        for (let prop in attr) {
            element[prop] = attr[prop];
        }
        for (let item of content) {
            if (typeof item == 'string' || typeof item == 'number') {
                item = document.createTextNode(item);
            }
            element.appendChild(item);
        }

        return element;
    }
}