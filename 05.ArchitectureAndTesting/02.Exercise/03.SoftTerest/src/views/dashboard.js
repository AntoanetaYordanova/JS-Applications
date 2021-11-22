const section = document.getElementById('dashboard-holder');
section.remove();


export async function showDashboardPage(ctx) {
    ctx.showSection(section);
}