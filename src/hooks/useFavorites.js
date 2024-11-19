import { LS_KEYS, MAX_FAVORITE_CITIES } from 'constants';
import { useState } from 'react';
import { ApiService, StorageService } from 'services';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(
    StorageService.get(LS_KEYS.favoriteCities) || [],
  );

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

  const fetchAndSetFavorites = async (favorites) => {
    try {
      const favoritesWithWeather = await ApiService.getCitiesWeatherData(
        favorites,
      );

      setFavorites(favoritesWithWeather);
    } catch (error) {
      console.error(error);
    }
  };
  return { favorites, onChangeFavorites, fetchAndSetFavorites };
};
