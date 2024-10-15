import {
  replaceSpacesAndDashes,
  mapForecastData,
  mapCurrentWeatherData,
  mapCitiesInfo,
} from 'utils';

const MAX_SERCH_RESULTS = 8;

export class ApiService {
  static async getCityInfo(cityName, options = { getArray: false }) {
    const validatedCityName = replaceSpacesAndDashes(cityName);

    const maxCities = options.getArray ? MAX_SERCH_RESULTS : 1;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${validatedCityName}&format=json&addressdetails=1&limit=${maxCities}&accept-language=ru`,
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

      if (options.getArray) {
        const mappedData = mapCitiesInfo(citiesData);

        return mappedData;
      }

      const { name, lat, lon, place_id } = citiesData[0];
      return { name, lat, lon, id: place_id };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getCurrentWeatherData(cityData) {
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
      const mappedData = mapCurrentWeatherData(data);

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

  static async getWeatherData(city) {
    try {
      const cityInfo =
        typeof city === 'object' ? city : await ApiService.getCityInfo(city);

      const now = await ApiService.getCurrentWeatherData(cityInfo);
      const forecast = await ApiService.getForecastData(cityInfo);

      return { city: cityInfo, weather: { now, forecast } };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getCitiesWeatherData(weatherDataArray) {
    try {
      const dataWithWeather = await Promise.all(
        weatherDataArray.map(async (weatherDataElement) => {
          try {
            const newWeatherData = await ApiService.getWeatherData(
              weatherDataElement.city,
            );

            return newWeatherData;
          } catch (error) {
            console.log(error);
            return { city: weatherDataElement.city, isError: true };
          }
        }),
      );

      return dataWithWeather;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
