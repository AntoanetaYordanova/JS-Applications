//intialization
// - find relevant section

import { showView } from './functions.js';

// - detach section from DOM
const section = document.getElementById('home-page');
section.remove();

// display logic

export function showHome() {
    showView(section);
}