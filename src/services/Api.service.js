import { mapForecastData, mapCurrentWeatherData, mapCitiesInfo } from 'utils';
import { StringService } from 'services';

const MAX_SERCH_RESULTS = 8;

export class ApiService {
  static async getCityInfo(city, options = { getArray: false, signal: null }) {
    try {
      const maxCities = options.getArray ? MAX_SERCH_RESULTS : 1;

      let url;
      if (city?.city?.lat && city?.city?.lon) {
        url = `https://nominatim.openstreetmap.org/reverse.php?lat=${city.city.lat}&lon=${city.city.lon}&zoom=10&format=json&addressdetails=1&limit=${maxCities}&accept-language=ru`;
      } else {
        const validatedCityName = StringService.replaceSpacesAndDashes(city);
        url = `https://nominatim.openstreetmap.org/search.php?q=${validatedCityName}&format=json&addressdetails=1&limit=${maxCities}&accept-language=ru`;
      }

      const response = await fetch(url, { signal: options.signal });

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

      const cityData = Array.isArray(citiesData) ? citiesData[0] : citiesData;

      const { name, lat, lon, place_id } = cityData;
      return { name, lat, lon, id: place_id };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getCurrentWeatherData(cityData, options = { signal: null }) {
    if (!cityData.lat || !cityData.lon) {
      return Promise.reject('Ошибка получения координат');
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=ru`,
        { signal: options.signal },
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

  static async getForecastData(cityData, options = { signal: null }) {
    if (!cityData.lat || !cityData.lon) {
      return Promise.reject('Ошибка получения координат');
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=ru`,
        { signal: options.signal },
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

  static async getWeatherData(city, options = { signal: null }) {
    try {
      let cityInfo = city;
      if (typeof city !== 'object') {
        cityInfo = await ApiService.getCityInfo(city, {
          signal: options.signal,
        });
      } else if (!city?.name) {
        cityInfo = await ApiService.getCityInfo(city, {
          signal: options.signal,
        });
      }

      const now = await ApiService.getCurrentWeatherData(cityInfo, {
        signal: options.signal,
      });
      const forecast = await ApiService.getForecastData(cityInfo, {
        signal: options.signal,
      });

      return { city: cityInfo, weather: { now, forecast } };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getCitiesWeatherData(
    weatherDataArray,
    options = { signal: null },
  ) {
    try {
      const dataWithWeather = await Promise.all(
        weatherDataArray.map(async (weatherDataElement) => {
          try {
            const newWeatherData = await ApiService.getWeatherData(
              weatherDataElement.city,
              { signal: options.signal },
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
