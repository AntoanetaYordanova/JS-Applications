//intialization
// - find relevant section

import { showView } from './functions.js';

// - detach section from DOM
const section = document.getElementById('form-sign-up');
section.remove();

// display logic

export function showRegister() {
    showView(section);
}