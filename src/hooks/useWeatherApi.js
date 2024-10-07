import { useState } from 'react';

const KEY = process.env.REACT_APP_WEATHER_API_KEY;

export function useWeatherApi() {
  const [weather, setWeather] = useState({ now: {}, forecast: {} });

  const fetchWeather = async (activeCity) => {
    if (!activeCity) return;
    try {
      const nowDataResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${activeCity.lat}&lon=${activeCity.lon}&appid=${KEY}&units=metric&lang=ru`
      );
      if (!nowDataResponse.ok) {
        throw new Error('Ошибка загрузки данных, повторите попытку');
      }
      const nowData = await nowDataResponse.json();

      const forecastDataResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${activeCity.lat}&lon=${activeCity.lon}&appid=${KEY}&units=metric&lang=ru`
      );
      if (!forecastDataResponse.ok) {
        throw new Error('Ошибка загрузки данных, повторите попытку');
      }
      const forecastData = await forecastDataResponse.json();

      setWeather({ now: { nowData }, forecast: { forecastData } });
      return { nowData, forecastData };
    } catch (error) {
      console.log('Отсутствует связь со сторонним сервисом', error.message);
    }
  };

  return {
    weather,
    fetchWeather,
  };
}
