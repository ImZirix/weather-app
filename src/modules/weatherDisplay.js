export class WeatherDisplay {
  constructor(address, condition, temp, humidity) {
    this.address = address;
    this.condition = condition;
    this.temp = temp;
    this.humidity = humidity;
  }
  converter(f) {
    return ((f - 32) * 5) / 9;
  }

  display(address, condition, temp, humidity) {
    const weatherContainer = document.querySelector(".weather-container");

    weatherContainer.innerHTML = "";

    function createWeatherElement(e, clas) {
      const element = document.createElement("div");
      element.textContent = e;
      element.classList.add(clas);
      return element;
    }
    weatherContainer.appendChild(createWeatherElement(address, "address"));
    weatherContainer.appendChild(createWeatherElement(condition, "condition"));
    weatherContainer.appendChild(createWeatherElement(temp, "temp"));
    weatherContainer.appendChild(createWeatherElement(humidity, "humidity"));
  }
}
