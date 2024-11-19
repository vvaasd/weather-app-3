import { LS_KEYS } from 'constants';
import { useRef, useState } from 'react';
import { ApiService, StorageService } from 'services';

export const useGeolocation = () => {
  const geolocationWeatherDataRef = useRef(
    StorageService.get(LS_KEYS.storedCity) || null,
  );
  const [isGeolocationFailed, setIsGeolocationFailed] = useState(false);
  const [isGeolocationLoading, setIsGeolocationLoading] = useState(false);

  const fetchAndSetGeolocationWeatherData = async (coords) => {
    try {
      const newWeatherData = await ApiService.getWeatherData(coords);

      geolocationWeatherDataRef.current = newWeatherData;
      setIsGeolocationFailed(false);
      setIsGeolocationLoading(false);
    } catch (error) {
      console.error(error);
      setIsGeolocationFailed(true);
      setIsGeolocationLoading(false);
    }
  };

  const geolocate = () => {
    setIsGeolocationLoading(true);
    const geolocator = navigator.geolocation;
    if (!geolocator) {
      console.error('Геолокация не поддерживается');
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

        fetchAndSetGeolocationWeatherData({ city: coords });
      },
      (error) => {
        console.error(error);
        setIsGeolocationLoading(false);
        setIsGeolocationFailed(true);
      },
    );
  };

  return {
    geolocationWeatherData: geolocationWeatherDataRef.current,
    isGeolocationFailed,
    isGeolocationLoading,
    geolocate,
  };
};
