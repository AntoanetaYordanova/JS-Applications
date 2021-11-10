//intialization
// - find relevant section

import { showView } from './functions.js';

// - detach section from DOM
const section = document.getElementById('add-movie');
section.remove();

// display logic

export function showCreate() {
    showView(section);
}