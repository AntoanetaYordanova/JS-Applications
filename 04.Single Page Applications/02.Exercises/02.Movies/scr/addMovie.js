import { showSection } from "./dom.js";
const section = document.getElementById('add-movie');

section.remove();

export function addMovie() {
    showSection(section);
}