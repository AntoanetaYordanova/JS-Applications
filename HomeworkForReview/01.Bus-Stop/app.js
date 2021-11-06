async function getInfo() {

    const stopID = document.getElementById('stopId').value;
    const stopNameElement = document.getElementById('stopName');
    const ulElement = document.getElementById('buses');
    const btn = document.getElementById('submit');

    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopID}`;

    try {
        stopNameElement.textContent = 'Loading...';
        ulElement.replaceChildren();

        const res = await fetch(url);
        if(res.status != 200) {
            throw new Error('Stop ID not found');
        }

        const data = await res.json();

        stopNameElement.textContent = data.name;
        
        Object.entries(data.buses).forEach(b => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            ulElement.appendChild(liElement);
        });

    } catch (error) {
        stopNameElement.textContent = 'Error';
    }
}