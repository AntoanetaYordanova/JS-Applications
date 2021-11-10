//intialization
// - find relevant section

import { showView } from './functions.js';

// - detach section from DOM
const section = document.getElementById('form-login');
section.remove();

// display logic

export function showLogin() {
    showView(section);
}