import { useEffect, useState } from 'react';
import { WeatherContext } from 'contexts';
import { ApiService } from 'services';

export const WeatherContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const fetchAndSetWeatherData = async (cityInfo) => {
    try {
      setIsLoading(true);

      const weatherNow = await ApiService.getWeatherNowData(cityInfo);
      const forecast = await ApiService.getForecastData(cityInfo);

      setCurrentWeather(weatherNow);
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
  }, [currentCity]);

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
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
