async function solution() {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const headDataResponse = await fetch(url);
    const headData = await headDataResponse.json();
    const mainEl = document.getElementById('main');

    headData.forEach(d => {
      const button = createEl('button', 'button', 'more');
      button.addEventListener('click', moreLessInfo);
      button.id = d._id;
      const div = createEl('div', 'accordion', createEl('div', 'head', createEl('span', undefined, d.title), button), createEl('div', 'extra', createEl('p')));
      mainEl.appendChild(div);
    });

    async function moreLessInfo(ev) {
        const hidden = ev.target.parentElement.parentElement.querySelector('.extra');
        
        if(ev.target.textContent === 'more') {
            hidden.style.display = 'inline';
            ev.target.textContent = 'less';
            const id = ev.target.id;
            const moreInfoResponse = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`);
            const moreInfo = await moreInfoResponse.json();
            hidden.querySelector('p').textContent = moreInfo.content;
        } else {
            hidden.style.display = 'none';
            ev.target.textContent = 'more';
        }
    }
}

function createEl(type, className, ...content) {
    const el = document.createElement(type);

    if(className !== undefined) {
        el.classList.add(className);
    }

    content.forEach(e => {
        if(typeof e === 'string') {
            el.appendChild(document.createTextNode(e));
        } else {
            el.appendChild(e);
        }
    });

    return el;
}

solution()