const main = document.getElementById('main');

export function showSection(section) {
    main.replaceChildren(section)
}

export function e(type, attribute, ...content) {
    const el = document.createElement(type);
    const entries = Object.entries(attribute)

    for(let [attribute, value] of entries || {}) {
        if(attribute.substring(0 ,2) == 'on'){
            el.addEventListener(attribute.substring(2).toLowercase(), value);
        } else {
            result[attribute] = value;
        }
    }

    content.forEach(e => {
        if(typeof e == 'string') {
            el.appendChild(document.createTextNode(e));
        } else {
            el.appendChild(e);
        }
    });

    return el
}