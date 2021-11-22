const section = document.getElementById('login');
section.remove();

export async function showLoginPage(ctx) {
    ctx.showSection(section);
}