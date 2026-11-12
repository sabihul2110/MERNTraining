/**
 * Weather Forecast Application
 * Fetches and renders real-time weather metrics from the wttr.in JSON endpoint.
 */

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherOutput = document.getElementById("weatherOutput");

searchBtn.addEventListener("click", fetchCityWeather);

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchCityWeather();
  }
});

async function fetchCityWeather() {
  const queryCity = cityInput.value.trim();

  if (!queryCity) {
    weatherOutput.innerHTML = `
      <p class="status-message">Please enter a valid city name.</p>
    `;
    return;
  }

  weatherOutput.innerHTML = `
    <p class="status-message">Fetching latest weather data... 🌤️</p>
  `;
  searchBtn.disabled = true;

  try {
    const endpoint = `https://wttr.in/${encodeURIComponent(queryCity)}?format=j1`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("Unable to reach weather service");
    }

    const payload = await response.json();

    if (!payload.current_condition || payload.current_condition.length === 0) {
      throw new Error("City not found");
    }

    const current = payload.current_condition[0];
    const nearestArea = payload.nearest_area?.[0];

    const areaName = nearestArea?.areaName?.[0]?.value || queryCity;
    const regionName = nearestArea?.region?.[0]?.value || "";
    const countryName = nearestArea?.country?.[0]?.value || "";

    const tempC = current.temp_C;
    const feelsLikeC = current.FeelsLikeC;
    const humidity = current.humidity;
    const windSpeedKmph = current.windspeedKmph;
    const cloudCover = current.cloudcover;
    const visibilityKm = current.visibility;
    const description = current.weatherDesc?.[0]?.value || "Clear";
    const iconUrl = current.weatherIconUrl?.[0]?.value || "";
    const observedAt = current.observation_time;

    weatherOutput.innerHTML = `
      <div class="location">
        <h2>${areaName}${regionName ? `, ${regionName}` : ""}</h2>
        <p>${countryName}</p>
      </div>

      <div class="main-weather">
        ${iconUrl ? `<img class="weather-icon" src="${iconUrl}" alt="${description}">` : ""}
        <div class="temperature">${tempC}°C</div>
        <div class="condition">${description}</div>
        <div class="feels-like">Feels like ${feelsLikeC}°C</div>
      </div>

      <div class="weather-details">
        <div class="weather-card">
          <h3>💧 Humidity</h3>
          <p>${humidity}%</p>
        </div>
        <div class="weather-card">
          <h3>💨 Wind</h3>
          <p>${windSpeedKmph} km/h</p>
        </div>
        <div class="weather-card">
          <h3>☁️ Clouds</h3>
          <p>${cloudCover}%</p>
        </div>
        <div class="weather-card">
          <h3>👁️ Visibility</h3>
          <p>${visibilityKm} km</p>
        </div>
      </div>

      <p class="observation">Observed at: ${observedAt} UTC</p>
    `;
  } catch (error) {
    weatherOutput.innerHTML = `
      <p class="status-message">❌ Could not find weather details for "${queryCity}". Please try another city.</p>
    `;
  } finally {
    searchBtn.disabled = false;
  }
}
