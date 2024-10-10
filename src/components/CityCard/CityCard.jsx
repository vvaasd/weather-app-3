import { useContext } from 'react';
import { CityCardSkeleton } from 'components';
import { WeatherContext } from 'contexts';
import { upperCaseFirst } from 'utils';
import { DateService } from 'services';
import styles from './CityCard.module.css';

export const CityCard = () => {
  const { currentCity, currentWeather, isLoading } = useContext(WeatherContext);

  if (isLoading || !currentCity || !currentWeather) {
    return <CityCardSkeleton />;
  }

  const dateByTimezone = DateService.getTimeByTimezone(
    new Date(),
    currentWeather.timezoneMs,
  );

  const dateText = upperCaseFirst(
    DateService.getFormattedLongDate(dateByTimezone),
  );
  const timeText = DateService.getFormattedShortTime(dateByTimezone);
  const weatherTypeText = upperCaseFirst(currentWeather.weatherType);
  const temperatureValue = Math.floor(currentWeather.temperature);
  const temperatureFeelsValue = Math.floor(currentWeather.temperatureFeels);

  return (
    <section className={styles.cityCard}>
      <div className={styles.dateTimeCity}>
        <h1 className={styles.location}>{currentCity.name}</h1>
        <p className={styles.date}>{dateText}</p>
        <time className={styles.time}>{timeText}</time>
      </div>
      <p className={styles.temperature}>{temperatureValue}</p>
      <div className={styles.weather}>
        <div className={styles.description}>
          <img
            src={`/images/weather-type/${currentWeather.iconName}.svg`}
            alt={currentWeather.weatherType}
            className={styles.weatherTypeIcon}
          />
          <span>{weatherTypeText}</span>
        </div>
        <p className={styles.temperatureFeels}>
          Ощущается как {temperatureFeelsValue}°
        </p>
      </div>
    </section>
  );
};

export default CityCard;
