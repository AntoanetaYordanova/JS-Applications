//intialization
// - find relevant section

import { showView } from './functions.js';

// - detach section from DOM
const section = document.getElementById('edit-movie');
section.remove();

// display logic

export function showEdit() {
    showView(section);
}