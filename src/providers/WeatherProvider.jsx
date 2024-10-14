import { useEffect, useState } from 'react';
import { WeatherContext } from 'contexts';
import { ApiService, StorageService } from 'services';
import { MAX_FAVORITE_CITIES, LS_KEYS } from 'constants';

const DEFAULT_CITY_NAME = 'Москва';
const MAX_HISTORY_LENGTH = 5;

export const WeatherContextProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  // const [currentCity, setCurrentCity] = useState(null);
  // const [currentWeather, setCurrentWeather] = useState(null);
  // const [forecast, setForecast] = useState(null);
  const [history, setHistory] = useState(
    StorageService.get(LS_KEYS.citiesHistory) || [],
  );
  const [favorites, setFavorites] = useState(
    StorageService.get(LS_KEYS.favoriteCities) || [],
  );

  const onChangeFavorites = (cityAndWeatherInfo) => {
    const newFavorites = [...favorites];

    const cityIndex = newFavorites.findIndex(
      (favorite) => favorite.city.name === cityAndWeatherInfo.city.name,
    );

    if (cityIndex !== -1) {
      newFavorites.splice(cityIndex, 1);
    } else if (newFavorites.length < MAX_FAVORITE_CITIES) {
      newFavorites.push(cityAndWeatherInfo);
    } else {
      return;
    }

    const newFavoritesWithoutWeather = newFavorites.map((favorite) => ({
      city: favorite.city,
    }));

    StorageService.set(LS_KEYS.favoriteCities, newFavoritesWithoutWeather);
    setFavorites(newFavorites);
  };

  const onChangeHistory = (cityAndWeatherInfo) => {
    const newHistory = [...history];

    const cityIndex = newHistory.findIndex(
      (historyElement) =>
        historyElement.city.name === cityAndWeatherInfo.city.name,
    );

    if (cityIndex !== -1) {
      newHistory.splice(cityIndex, 1);
    } else if (newHistory.length >= MAX_HISTORY_LENGTH) {
      newHistory.shift();
    }
    newHistory.push(cityAndWeatherInfo);

    const newHistoryWithoutWeather = newHistory.map((favorite) => ({
      city: favorite.city,
    }));

    StorageService.set(LS_KEYS.citiesHistory, newHistoryWithoutWeather);
    setHistory(newHistory);
  };

  const onClearHistory = () => {
    StorageService.remove(LS_KEYS.citiesHistory);
    setHistory([]);
  };

  const fetchAndSetWeatherData = async (cityInfo) => {
    try {
      const { city, weather } = await ApiService.getWeatherData(cityInfo);

      setWeatherData({ city, weather });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAndSetFavorites = async (favorites) => {
    try {
      const favoritesWithWeather = await ApiService.getCitiesWeatherData(
        favorites,
      );

      setFavorites(favoritesWithWeather);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAndSetHistory = async (history) => {
    try {
      const favoritesWithWeather = await ApiService.getCitiesWeatherData(
        history,
      );

      setHistory(favoritesWithWeather);
    } catch (error) {
      console.log(error);
    }
  };

  const onPageLoad = () => {
    fetchAndSetWeatherData(DEFAULT_CITY_NAME);
    fetchAndSetFavorites(favorites);
    fetchAndSetHistory(history);
  };

  useEffect(() => {
    onPageLoad();
    // eslint-disable-next-line
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        setWeatherData,
        favorites,
        onChangeFavorites,
        history,
        onChangeHistory,
        onClearHistory,
        fetchAndSetWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
