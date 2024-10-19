import { useEffect, useState } from 'react';
import { MAX_FAVORITE_CITIES, LS_KEYS } from 'constants';
import { WeatherContext } from 'context';
import { ApiService, StorageService } from 'services';

const DEFAULT_CITY_NAME = 'Москва';
const MAX_HISTORY_LENGTH = 5;

export const WeatherContextProvider = ({ children }) => {
  const [isWeatherDataFailed, setIsWeatherDataFailed] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [geolocationWeatherData, setGeolocationWeatherData] = useState(
    StorageService.get(LS_KEYS.storedCity) || null,
  );
  const [isGeolocationFailed, setIsGeolocationFailed] = useState(false);
  const [isGeolocationLoading, setIsGeolocationLoading] = useState(false);
  const [history, setHistory] = useState(
    StorageService.get(LS_KEYS.citiesHistory) || [],
  );
  const [favorites, setFavorites] = useState(
    StorageService.get(LS_KEYS.favoriteCities) || [],
  );

  const geolocate = () => {
    setIsGeolocationLoading(true);
    const geolocator = navigator.geolocation;
    if (!geolocator) {
      console.log('Геолокация не поддерживается');
      setIsGeolocationLoading(false);
      setIsGeolocationFailed(true);
      return;
    }

    geolocator.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        fetchAndSetGeolocationWeatherData({ city: coords }).then(() => {});
      },
      (error) => {
        console.log(error);
        setIsGeolocationLoading(false);
        setIsGeolocationFailed(true);
      },
    );
  };

  const fetchAndSetGeolocationWeatherData = async (coords) => {
    try {
      const newWeatherData = await ApiService.getWeatherData(coords);

      setGeolocationWeatherData(newWeatherData);
      setIsGeolocationFailed(false);
      setIsGeolocationLoading(false);
    } catch (error) {
      console.log(error);
      setIsGeolocationFailed(true);
      setIsGeolocationLoading(false);
    }
  };

  const fetchAndSetWeatherData = async (coords) => {
    try {
      const newWeatherData = await ApiService.getWeatherData(coords);

      setWeatherData(newWeatherData);
      setIsWeatherDataFailed(false);
    } catch (error) {
      console.log(error);
      setIsWeatherDataFailed(true);
    }
  };

  const onChangeFavorites = (weatherData) => {
    const newFavorites = [...favorites];

    const cityIndex = newFavorites.findIndex(
      (favorite) => favorite.city.name === weatherData.city.name,
    );

    if (cityIndex !== -1) {
      newFavorites.splice(cityIndex, 1);
    } else if (newFavorites.length < MAX_FAVORITE_CITIES) {
      newFavorites.push(weatherData);
    } else {
      return;
    }

    const newFavoritesWithoutWeather = newFavorites.map((favorite) => ({
      city: favorite.city,
    }));

    StorageService.set(LS_KEYS.favoriteCities, newFavoritesWithoutWeather);
    setFavorites(newFavorites);
  };

  const onChangeHistory = (weatherData) => {
    const newHistory = [...history];

    const cityIndex = newHistory.findIndex(
      (historyElement) => historyElement.city.name === weatherData.city.name,
    );

    if (cityIndex !== -1) {
      newHistory.splice(cityIndex, 1);
    } else if (newHistory.length >= MAX_HISTORY_LENGTH) {
      newHistory.shift();
    }
    newHistory.push(weatherData);

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
    fetchAndSetWeatherData(
      StorageService.get(LS_KEYS.storedCity) || DEFAULT_CITY_NAME,
    );
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
        isWeatherDataFailed,
        setIsWeatherDataFailed,
        favorites,
        onChangeFavorites,
        history,
        onChangeHistory,
        onClearHistory,
        geolocationWeatherData,
        isGeolocationFailed,
        isGeolocationLoading,
        geolocate,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
