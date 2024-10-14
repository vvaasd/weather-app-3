import { useEffect, useState } from 'react';
import { WeatherContext } from 'contexts';
import { ApiService, StorageService } from 'services';
import { MAX_FAVORITE_CITIES, LS_KEYS } from 'constants';

export const WeatherContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState(
    StorageService.get(LS_KEYS.favoriteCities) || [],
  );

  const fetchAndSetWeatherData = async (cityInfo) => {
    try {
      setIsLoading(true);

      const { now, forecast } = await ApiService.getWeatherData(cityInfo);

      setCurrentWeather(now);
      setForecast(forecast);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      if (currentWeather && forecast) {
        setIsLoading(false);
      }
    }
  };

  const onChangeFavoriteCities = (cityInfo) => {
    const newCities = [...favoriteCities];

    const cityIndex = newCities.findIndex(
      (city) => city.name === cityInfo.name,
    );

    if (cityIndex !== -1) {
      newCities.splice(cityIndex, 1);
    } else if (newCities.length < MAX_FAVORITE_CITIES) {
      newCities.push(cityInfo);
    } else {
      return;
    }

    StorageService.set(LS_KEYS.favoriteCities, newCities);
    setFavoriteCities(newCities);
  };

  const onPageLoad = () => {
    ApiService.getCityInfo('Москва')
      .then((cityInfo) => {
        setCurrentCity(cityInfo);
        return cityInfo;
      })
      .then((cityInfo) => {
        fetchAndSetWeatherData(cityInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentCity?.lat && currentCity?.lon) {
      fetchAndSetWeatherData(currentCity);
    }
    // eslint-disable-next-line
  }, [currentCity]); //!

  useEffect(() => {
    onPageLoad();
    // eslint-disable-next-line
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        isLoading,
        setIsLoading,
        currentCity,
        setCurrentCity,
        currentWeather,
        setCurrentWeather,
        forecast,
        setForecast,
        favoriteCities,
        onChangeFavoriteCities,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
