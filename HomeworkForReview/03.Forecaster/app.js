const forecastDiv = document.getElementById('forecast');
const currentDiv = document.getElementById('current');
const upcomingDiv = document.getElementById('upcoming');

function attachEvents() {
    document.getElementById('submit').addEventListener('click', async () => {
               
        const locationName = document.getElementById('location').value;
        const { current, upcoming } = await getForecast(locationName);

        forecastDiv.style.display = 'block';

        currentDiv.replaceChildren();
        upcomingDiv.replaceChildren();

        currentDiv.appendChild(e('div', { className: 'label' }, `Current conditions`));
        upcomingDiv.appendChild(e('div', { className: 'label' }, `Three-day forecast`));

        currentDiv.appendChild(createCurrentCondition(current));
        upcomingDiv.appendChild(createupcomingCondition(upcoming));
    })
}

attachEvents();

async function getForecast(name) {
    const code = await getLocationCode(name);
    const [current, upcoming] = await Promise.all([
        getCurrent(code),
        getUpcoming(code)
    ]);

    return { current, upcoming };
}

function createCurrentCondition(current) {
    const forecastsDiv = e('div', { className: 'forecasts' },
        e('span', { className: 'condition symbol' }, `${weatherSymbols[current.forecast.condition]}`),
        e('span', { className: 'condition' },
            e('span', { className: 'forecast-data' }, `${current.name}`),
            e('span', { className: 'forecast-data' }, `${current.forecast.low}${weatherSymbols.degrees}/${current.forecast.high}${weatherSymbols.degrees}`),
            e('span', { className: 'forecast-data' }, `${current.forecast.condition}`)
        )
    )

    return forecastsDiv;
}

function createupcomingCondition(upcoming) {
    const upcomingDaysArr = upcoming.forecast;
    const forecastInfoDiv = e('div', { className: 'forecast-info' }, '')

    upcomingDaysArr.forEach(element => {
        const spanUpcoming = e('span', { className: 'upcoming' },
            e('span', { className: 'symbol' }, `${weatherSymbols[element.condition]}`),
            e('span', { className: 'forecast-data' }, `${element.low}${weatherSymbols.degrees}/${element.high}${weatherSymbols.degrees}`),
            e('span', { className: 'forecast-data' }, `${element.condition}`)
        )
        forecastInfoDiv.appendChild(spanUpcoming);
    });

    return forecastInfoDiv;
}

async function getLocationCode(name) {
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';

    try {
        const res = await fetch(url);
        if (res.status != 200) {
            throw new Error('Location not found');
        }
        const data = await res.json();

        const location = data.find(l => l.name == name);

        return location.code;
    } catch (err) {
        alert(err.message);
    }
}

async function getCurrent(code) {
    const url = `http://localhost:3030/jsonstore/forecaster/today/${code}`;

    try {
        const res = await fetch(url);
        if (res.status != 200) {
            throw new Error('Location not found');
        }
        const data = await res.json();

        return data;
    } catch (err) {
        alert(err.message);
    }
}

async function getUpcoming(code) {
    try {
        const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

        const res = await fetch(url);
        if (res.status != 200) {
            throw new Error('Location not found');
        }
        const data = await res.json();

        return data;
    } catch (err) {
        alert(err.message);
    }
}

function e(type, attr, ...content) {
    const element = document.createElement(type);

    for (let prop in attr) {
        element[prop] = attr[prop];
    }
    for (let item of content) {
        if (typeof item == 'string' || typeof item == 'number') {
            item = document.createTextNode(item);
        }
        element.appendChild(item);
    }

    return element;
}

const weatherSymbols = {
    Sunny: String.fromCharCode(0x2600),
    'Partly sunny': String.fromCharCode(0x26C5),
    Overcast: String.fromCharCode(0x2601),
    Rain: String.fromCharCode(0x2614),
    degrees: String.fromCharCode(176),
}