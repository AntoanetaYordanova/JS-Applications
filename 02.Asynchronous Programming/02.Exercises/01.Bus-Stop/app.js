function getInfo() {
    manipualteData();

    async function manipualteData() {
        const stopNameEl = document.getElementById('stopName');
        const list = document.getElementById('buses');
        list.innerHTML = '';
        const busId = document.getElementById('stopId').value;
        try {
            const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${busId}`);
            if(response.status != 200) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            stopNameEl.textContent = data.name;
            for(let bus in data.buses) {
                const li = document.createElement('li');
                li.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
                list.appendChild(li);
            }

        } catch(e) {
            stopNameEl.textContent = 'Error';
        }
    }
}