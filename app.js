const apiKey = '6a0ed5dd4fc47b472ce2e9685f09aa61';
const weatherInfo = document.getElementById('weatherInfo');
const cityInput = document.getElementById('cityInput');

async function getWeather() {
    const cityName = cityInput.value.trim();

    if (cityName === '') {
        alert('Please enter a city name.');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again later.');
    }
}

function displayWeather(data) {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;

    weatherInfo.innerHTML = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Humidity: ${humidity}%</p>
    `;
}
