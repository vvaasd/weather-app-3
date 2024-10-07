import { useContext, useEffect, useState } from 'react';
import { IconTrash } from '../ui';
import Preloader from '../ui/preloader/Preloader';
import { useWeatherApi } from '../../hooks/useWeatherApi';
import { WeatherContext } from '../../contexts/weather-context';
import styles from './Dropdown.module.css';
import { calculatePressure } from '../../utils';

const Dropdown = ({
  className = '',
  searching = false,
  currentCity,
  wasSearch = false,
  isOpen = true,
  onClear,
}) => {
  const [title, setTitle] = useState('Недавно смотрели');
  const [cityHistory, setCityHistory] = useState([]);
  const { fetchWeather } = useWeatherApi();
  const {
    setCity,
    setTemp,
    setFeelsLike,
    setIcon,
    setDescription,
    setHumidity,
    setPressure,
    setVisibility,
    setWind,
    setSunrise,
    setSunset,
    setTimezone,
    setForecastList,
  } = useContext(WeatherContext);

  useEffect(() => {
    const cityList = localStorage.getItem('cityHistory');
    if (cityList) {
      const list = JSON.parse(cityList);
      setCityHistory(list);
    }
  }, []);

  useEffect(() => {
    if (searching) {
      setTitle('Ищем...');
    }
  }, [searching]);

  useEffect(() => {
    if (wasSearch) {
      if (currentCity) {
        setTitle('Результат поиска');
      } else {
        setTitle('Упс! Город не найден');
      }
    } else {
      setTitle('Недавно смотрели');
    }
  }, [currentCity, wasSearch]);

  const addLocalStorage = (city) => {
    if (!cityHistory.length) {
      localStorage.setItem('cityHistory', JSON.stringify([city]));
      setCityHistory([city]);
    } else {
      const newCityHistory = [...cityHistory];
      const cityIsset = newCityHistory.find((el) => el.city === city.city);

      if (cityIsset) {
        const index = newCityHistory.findIndex((el) => el.city === city.city);
        newCityHistory.unshift(newCityHistory.splice(index, 1)[0]);
        setCityHistory(newCityHistory);
        return;
      }

      if (newCityHistory.length > 4) {
        newCityHistory.pop();
      }

      newCityHistory.unshift(city);
      setCityHistory(newCityHistory);
      localStorage.setItem('cityHistory', JSON.stringify(newCityHistory));
    }
  };

  const clearLocalStorage = () => {
    if (cityHistory) {
      localStorage.removeItem('cityHistory');
      setCityHistory([]);
    }
  };

  const onClick = async (city) => {
    onClear();
    addLocalStorage(city);
    const { nowData, forecastData } = await fetchWeather(city);
    const { visibility, main, wind, weather, sys, timezone } = nowData;
    setCity(city ? city?.city : '');
    setTemp(main?.temp);
    setFeelsLike(main?.feels_like);
    setIcon(weather[0].icon);
    setDescription(weather[0].description);
    setHumidity(main?.humidity);
    setPressure(calculatePressure(main.pressure));
    setVisibility(Math.round(visibility / 1000));
    setWind(wind);
    setSunrise(sys.sunrise);
    setSunset(sys.sunset);
    setTimezone(timezone);
    setForecastList(forecastData.list);
  };

  return (
    <>
      {isOpen && (
        <div className={`${styles.block} ${className}`}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            {!wasSearch && !searching && (
              <button
                disabled={cityHistory.length ? false : true}
                onClick={clearLocalStorage}
                className={`btn-reset ${styles.btn}`}
              >
                <IconTrash />
              </button>
            )}
          </div>
          {searching ? (
            <div className={styles.preloader}>
              <Preloader />
            </div>
          ) : !wasSearch ? (
            cityHistory.length ? (
              <ul className={`list-reset ${styles.list}`}>
                {cityHistory.map((city) => (
                  <li key={city.city}>
                    <button
                      onClick={() => {
                        onClick(city);
                      }}
                      className={`btn-reset ${styles.city}`}
                    >
                      {city.city}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.text}>История пустая</p>
            )
          ) : !currentCity ? (
            <p className={styles.text}>Попробуйте другое название</p>
          ) : (
            ''
          )}
          {!searching && currentCity ? (
            <button
              className={`btn-reset ${styles.city}`}
              onClick={() => {
                onClick(currentCity);
              }}
            >
              {currentCity.city}
            </button>
          ) : (
            ''
          )}
        </div>
      )}
    </>
  );
};

export default Dropdown;
