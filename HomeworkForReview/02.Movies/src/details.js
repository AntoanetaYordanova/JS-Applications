//intialization
// - find relevant section

import { showView } from './functions.js';

// - detach section from DOM
const section = document.getElementById('movie-example');
section.remove();

// display logic

export function showDetails() {
    showView(section);
}