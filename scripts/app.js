
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

// Update the UI with weather data
const updateUI = (data) => {
    console.log(data);

    // Destructure properties
    const { cityDetails, weather } = data;

    // Update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // Update icon images for night/day
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    // Remove the d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

// Update city and weather information
const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);
    return { cityDetails, weather };
};

// Event listener for form submission
cityForm.addEventListener('submit', e => {
    // Prevent default action
    e.preventDefault();

    // Get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // Update the UI with a new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});
