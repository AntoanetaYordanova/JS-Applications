function getInfo() {
    manipualteData();

    async function manipualteData() {
        const list = document.getElementById('buses');
        list.innerHTML = '';
        const busId = document.getElementById('stopId').value;
        try {
            const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${busId}`);
            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            for(let bus in data.buses) {
                const li = document.createElement('li');
                li.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
                list.appendChild(li);
            }

        } catch(e) {
            list.textContent = e.message;
        }
    }
}