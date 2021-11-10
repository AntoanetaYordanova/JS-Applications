// craete placeholder modules for every view
// configure and test nvigation
// implement modules
// - create async functions for requests
// - implement DOM logic

import { showHome } from './home.js';
import { showDetails } from './details.js';
import { showCreate } from './create.js';

showHome();
window.showHome = showHome;
window.showDetails = showDetails;
window.showCreate = showCreate;
