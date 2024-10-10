import {
  replaceSpacesAndDashes,
  mapForecastData,
  mapWeatherNowData,
} from 'utils';

export class ApiService {
  static async getCityInfo(cityName) {
    const validatedCityName = replaceSpacesAndDashes(cityName);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${validatedCityName}&format=json&addressdetails=1&limit=1`,
      );

      if (!response.ok) {
        return Promise.reject(
          'Отсутствует связь со сторонним сервисом openstreetmap',
        );
      }

      const citiesData = await response.json();

      if (citiesData.length === 0) {
        return Promise.reject('Упс! Город не найден, попробуйте другой');
      }

      const { name, lat, lon } = citiesData[0];

      return { name, lat, lon };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getWeatherNowData(cityData) {
    if (!cityData.lat || !cityData.lon) {
      return Promise.reject('Ошибка получения координат');
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=ru`,
      );

      if (!response.ok) {
        return Promise.reject(
          'Отсутствует связь со сторонним сервисом openweathermap',
        );
      }

      const data = await response.json();

      const mappedData = mapWeatherNowData(data);

      return mappedData;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getForecastData(cityData) {
    if (!cityData.lat || !cityData.lon) {
      return Promise.reject('Ошибка получения координат');
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=ru`,
      );

      if (!response.ok) {
        return Promise.reject(
          'Отсутствует связь со сторонним сервисом openweathermap',
        );
      }

      const data = await response.json();

      const mappedData = mapForecastData(data.list);

      return mappedData;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
