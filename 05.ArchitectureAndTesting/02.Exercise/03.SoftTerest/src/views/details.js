const section = document.getElementById('details');

section.remove();

export async function showDetailsPage(ctx) {
    ctx.showSection(section);
}