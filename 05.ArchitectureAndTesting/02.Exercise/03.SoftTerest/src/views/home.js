import { e } from "../dom.js";

const section = document.getElementById('home');
section.remove();

export async function showHomePage(ctx) {
    ctx.showSection(section);
}