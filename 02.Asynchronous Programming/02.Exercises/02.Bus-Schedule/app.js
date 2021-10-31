function solve() {
    const infoSpan = document.querySelector('#info span');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let stopId = 'depot';
    let stopName = '';

    async function depart() {
        const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${stopId}`);
        const data = await response.json();
        stopId = data.next;
        stopName = data.name;

        infoSpan.textContent = `Next stop ${stopName}`;
        departBtn.setAttribute('disabled', 'true');
        arriveBtn.removeAttribute('disabled');
    }

    function arrive() {
        infoSpan.textContent = `Arriving at ${stopName}`;
        arriveBtn.setAttribute('disabled', 'true');
        departBtn.removeAttribute('disabled');
    }

    return {
        depart,
        arrive
    };
}

let result = solve();