import { WeatherDisplay } from "./weatherDisplay";
export async function fetchWeatherData(location) {
  try {
    const response = await fetch(location, { mode: "cors" });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Faild to fetch weather data:", error);
  }
}

export function generateWeatherApiUrl(location) {
  const ApiLocation = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=RK2ZG2WDB2QT7AWVZ7CARR2LZ&contentType=json`;
  return ApiLocation;
}

export function setupFormSubmission(form, input) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputValue = input.value.trim();

    if (inputValue) {
      const location = generateWeatherApiUrl(inputValue);
      if (location) {
        const weatherData = await fetchWeatherData(location);
        if (weatherData) {
          console.log(weatherData);
          const currentWeather = new WeatherDisplay(
            weatherData.address,
            weatherData.currentConditions.conditions,
            weatherData.currentConditions.temp,
            weatherData.currentConditions.humidity,
          );
          let tempToCelsius = currentWeather.converter(currentWeather.temp).toFixed();
          let humidity = "Humidity" + " " + currentWeather.humidity + "%";
          currentWeather.display(
            currentWeather.address,
            currentWeather.condition,
            tempToCelsius,
            humidity,
          );
          input.textContent = "";
        }
      }
    }
    async function updateWeather() {
      const location = generateWeatherApiUrl(inputValue);
      const weatherData = await fetchWeatherData(location);
      if (weatherData) {
        console.log(weatherData);
        const currentWeather = new WeatherDisplay(
          weatherData.address,
          weatherData.days[1].conditions,
          weatherData.days[1].temp,
          weatherData.days[1].humidity,
        );
        let tempToCelsius = currentWeather.converter(currentWeather.temp).toFixed();
        let humidity = "Humidity" + " " + currentWeather.humidity + "%";
        currentWeather.display(
          currentWeather.address,
          currentWeather.condition,
          tempToCelsius,
          humidity,
        );
        input.textContent = "";
      }
    }
    const tomo = document.querySelector(".tomo");
    tomo.addEventListener("click", () => {
      updateWeather();
    });
    const today = document.querySelector(".today");
    today.addEventListener("click", async (e) => {
      e.preventDefault();
      const inputValue = input.value.trim();

      if (inputValue) {
        const location = generateWeatherApiUrl(inputValue);
        if (location) {
          const weatherData = await fetchWeatherData(location);
          if (weatherData) {
            console.log(weatherData);
            const currentWeather = new WeatherDisplay(
              weatherData.address,
              weatherData.currentConditions.conditions,
              weatherData.currentConditions.temp,
              weatherData.currentConditions.humidity,
            );
            let tempToCelsius = currentWeather.converter(currentWeather.temp).toFixed();
            let humidity = "Humidity" + " " + currentWeather.humidity + "%";
            currentWeather.display(
              currentWeather.address,
              currentWeather.condition,
              tempToCelsius,
              humidity,
            );
            input.textContent = "";
          }
        }
      }
    });
  });
}
