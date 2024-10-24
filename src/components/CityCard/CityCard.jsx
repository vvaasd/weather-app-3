import { CityCardSkeleton } from 'components';
import { DateService, StringService } from 'services';
import styles from './CityCard.module.css';

export const CityCard = (props) => {
  const { weatherData } = props;

  const currentCity = weatherData?.city || null;
  const currentWeather = weatherData?.weather?.now || null;

  if (!currentCity || !currentWeather) {
    return <CityCardSkeleton />;
  }

  const dateByTimezone = DateService.getTimeByTimezone(
    new Date(),
    currentWeather.timezoneMs,
  );

  const dateText = StringService.upperCaseFirst(
    DateService.getFormattedLongDate(dateByTimezone),
  );
  const timeText = DateService.getFormattedShortTime(dateByTimezone);
  const weatherTypeText = StringService.upperCaseFirst(
    currentWeather.weatherType,
  );

  return (
    <section className={styles.cityCard}>
      <div className={styles.dateTimeCity}>
        <h2 className={styles.location}>{currentCity.name}</h2>
        <p className={styles.date}>{dateText}</p>
        <time className={styles.time}>{timeText}</time>
      </div>
      <p className={styles.temperature}>{currentWeather.temperature}°</p>
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
          Ощущается как {currentWeather.temperatureFeels}°
        </p>
      </div>
    </section>
  );
};

export default CityCard;
