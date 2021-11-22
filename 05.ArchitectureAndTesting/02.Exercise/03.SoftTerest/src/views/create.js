const section = document.getElementById('create');
section.remove();

export async function showCreatePage(ctx) {
    ctx.showSection(section);
}