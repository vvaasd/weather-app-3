export const mapCurrentWeatherData = (data) => {
  return {
    temperature: Math.round(data.main.temp),
    temperatureFeels: Math.round(data.main.feels_like),
    iconName: data.weather[0].icon,
    weatherType: data.weather[0].description,

    humidity: data.main.humidity,
    pressure: data.main.pressure,
    visibility: data.visibility,
    wind: { deg: data.wind.deg, speed: data.wind.speed },
    sunriseMs: data.sys.sunrise * 1000,
    sunsetMs: data.sys.sunset * 1000,

    timezoneMs: data.timezone * 1000,
  };
};
