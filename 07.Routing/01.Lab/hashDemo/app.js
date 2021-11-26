import page from '//unpkg.com/page/page.mjs';

const main = document.querySelector('main');

const views = {
  '/home': () => '<h2>Home Page</h2><p>Welcome to our page!</p>',
  '/catalog': () => '<h2>Catalog</h2><p>List of items</p>',
  '/about': () => '<h2>About Us</h2><p>contact: +555-01-02</p>',
};


function showContent(name) {
    const view = views[name];

    if(typeof view == 'function') {
        main.innerHTML = view();
    } else {
        main.innerHTML = '<h2>404</h2>';
    }

  main.innerHTML = view();
}

page('/home', () => (showContent('/home')));
page('/catalog', () => (showContent('/catalog')));
page('/about', () => (showContent('/about')));
page.start();