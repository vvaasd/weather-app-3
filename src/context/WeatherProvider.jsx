import { useEffect, useState } from 'react';
import { LS_KEYS } from 'constants';
import { WeatherContext } from 'context';
import { ApiService, StorageService } from 'services';
import { useFavorites, useGeolocation, useSearchHistory } from 'hooks';

const DEFAULT_CITY_NAME = 'Москва';

export const WeatherContextProvider = ({ children }) => {
  const [isWeatherDataFailed, setIsWeatherDataFailed] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const { history, onChangeHistory, onClearHistory, fetchAndSetHistory } =
    useSearchHistory();
  const { favorites, onChangeFavorites, fetchAndSetFavorites } = useFavorites();
  const {
    geolocationWeatherData,
    isGeolocationFailed,
    isGeolocationLoading,
    geolocate,
  } = useGeolocation();

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
