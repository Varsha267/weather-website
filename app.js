const apiKey = 'dbf30cd26bd5d20808c817d9451e1acd';
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const body = document.querySelector('body');

const backgroundImages = {
    'Rain': 'url(https://source.unsplash.com/1600x900/?rainy,city)',
    'Clear': 'url(https://source.unsplash.com/1600x900/?clear,sky)',
    'Clouds': 'url(https://source.unsplash.com/1600x900/?cloudy,sky)',
    'Snow': 'url(https://source.unsplash.com/1600x900/?snowy,mountains)',
};

searchButton.addEventListener('click', () => {
    const cityNameValue = cityInput.value.trim();
    if (cityNameValue) {
        fetch(`${url}${cityNameValue}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const condition = data.weather[0].description.toLowerCase();
                const imageUrl = backgroundImages[condition.split(' ')[0]] || backgroundImages['Clouds'];
                body.style.backgroundImage = imageUrl;
                cityName.textContent = data.name;
               temperature.textContent = `${data.main.temp} °C`;
                description.textContent = data.weather[0].description;
                humidity.textContent = `Humidity: ${data.main.humidity}%`;
                windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
            })
            .catch(error => {
                alert('Error fetching weather data. Please try again.');
                console.error(error);
            });
    } else {
        alert('Please enter a city name.');
    }
});