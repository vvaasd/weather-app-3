import { LS_KEYS } from 'constants';
import { useState } from 'react';
import { ApiService, StorageService } from 'services';

const MAX_HISTORY_LENGTH = 5;

export const useSearchHistory = () => {
  const [history, setHistory] = useState(
    StorageService.get(LS_KEYS.citiesHistory) || [],
  );

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

  const fetchAndSetHistory = async (history) => {
    try {
      const favoritesWithWeather = await ApiService.getCitiesWeatherData(
        history,
      );

      setHistory(favoritesWithWeather);
    } catch (error) {
      console.error(error);
    }
  };

  return { history, onChangeHistory, onClearHistory, fetchAndSetHistory };
};
