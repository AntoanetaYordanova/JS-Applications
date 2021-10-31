function attachEvents() {
  document.getElementById('submit').addEventListener('click', showForecast);
  const forecastDiv = document.getElementById('forecast');
  const forecastSymbols = {
    'Sunny' : '&#x2600;',
    'Partly sunny' : '&#x26C5;',
    'Overcast' : '&#x2601;',
    'Rain' : '&#x2614;'
  }

  async function showForecast() {
    try {
    forecastDiv.innerHTML = '<div id="current"><div class="label">Current conditions</div></div><div id="upcoming"><div class="label">Three-day forecast</div></div>';
      const inputEl = document.getElementById('location');
      const divCurrent = document.getElementById('current');
      const divUpcoming = document.getElementById('upcoming');
      const location = inputEl.value;

      const locationsResponse = await fetch(
        'http://localhost:3030/jsonstore/forecaster/locations'
      );
      const locationsData = await locationsResponse.json();
      const locationMatch = locationsData.find((e) => e.name == location);
      if (locationMatch == undefined) {
        throw new Error('Error');
      }

      const code = locationMatch.code;
      const currentForecastResponse = await fetch(
        `http://localhost:3030/jsonstore/forecaster/today/${code}`
      );
      const currentForecastData = await currentForecastResponse.json();

      if (!currentForecastResponse.ok) {
        throw new Error('Error');
      }

      const threeDaysForecastResponse = await fetch(
        `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`
      );
      const threeDaysForecastData = await threeDaysForecastResponse.json();

      if (!threeDaysForecastResponse.ok) {
        throw new Error('Error');
      }  
      
      forecastDiv.style.display = '';
    
      const currentWeatherEl = document.createElement('div');
      currentWeatherEl.classList.add('forecasts');
      currentWeatherEl.innerHTML = `<span class="condition symbol">${forecastSymbols[currentForecastData.forecast.condition]}</span><span class="condition"><span class="forecast-data">${currentForecastData.name}</span><span class="forecast-data">${currentForecastData.forecast.low}&#176;/${currentForecastData.forecast.high}&#176;</span><span class="forecast-data">${currentForecastData.forecast.condition}</span></span>`;
      divCurrent.appendChild(currentWeatherEl);

      const upcomingWeatherEl = document.createElement('div');
      upcomingWeatherEl.classList.add('forecast-info');
      upcomingWeatherEl.innerHTML = `<span class="upcoming"><span class="symbol">${forecastSymbols[threeDaysForecastData.forecast[0].condition]}</span><span class="forecast-data">${threeDaysForecastData.forecast[0].low}&#176;/${threeDaysForecastData.forecast[0].high}&#176;</span><span class="forecast-data">${threeDaysForecastData.forecast[0].condition}</span></span><span class="upcoming"><span class="symbol">${forecastSymbols[threeDaysForecastData.forecast[1].condition]}</span><span class="forecast-data">${threeDaysForecastData.forecast[1].low}&#176;/${threeDaysForecastData.forecast[1].high}&#176;</span><span class="forecast-data">${threeDaysForecastData.forecast[1].condition}</span></span><span class="upcoming"><span class="symbol">${forecastSymbols[threeDaysForecastData.forecast[2].condition]}</span><span class="forecast-data">${threeDaysForecastData.forecast[2].low}&#176;/${threeDaysForecastData.forecast[2].high}&#176;</span><span class="forecast-data">${threeDaysForecastData.forecast[2].condition}</span></span>`;
      divUpcoming.appendChild(upcomingWeatherEl);
      inputEl.value = '';

    } catch (e) {
        forecastDiv.style.display = '';
        forecastDiv.textContent = 'Error';
    }
  }
}

attachEvents();
