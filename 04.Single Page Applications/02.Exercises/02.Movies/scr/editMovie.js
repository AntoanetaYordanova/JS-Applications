import { showSection } from "./dom.js";
const section = document.getElementById('edit-movie');
section.remove();

export function showEditMovieSection() {
    showSection(section);
}

