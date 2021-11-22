const section = document.getElementById('register');
section.remove();

export async function showRegisterPage(ctx) {
    ctx.showSection(section);
}