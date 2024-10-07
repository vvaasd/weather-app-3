import { useContext } from 'react';
import Icon from '../icon/Icon';
import styles from './CityCard.module.css';
import { WeatherContext } from '../../contexts/weather-context';
import { upperCaseFirst } from '../../utils/upperCaseFirst';
import getTimeByTimezone from '../../utils/getTimeByTimezone';

function CityCard() {
  const { city, temp, feelsLike, icon, description, timezone } =
    useContext(WeatherContext);

  const formatterDate = new Intl.DateTimeFormat('ru', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const formatterTime = new Intl.DateTimeFormat('ru', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateByTimezone = getTimeByTimezone(new Date(), timezone * 1000);

  return (
    <section className={styles.cityCard}>
      <div className={styles.dateTimeCity}>
        <h1 className={styles.location}>{city}</h1>
        <p className={styles.date}>
          {upperCaseFirst(formatterDate.format(dateByTimezone))}
        </p>
        <time className={styles.time}>
          {formatterTime.format(dateByTimezone)}
        </time>
      </div>
      <div className={styles.temperature}>
        <p>{Math.floor(temp)}°</p>
      </div>
      <div className={styles.weather}>
        <div className={styles.description}>
          <Icon path={`/images/icons/weatherType/${icon}.svg`} size={24} />
          {upperCaseFirst(description)}
        </div>
        <p>Ощущается как {Math.floor(feelsLike)}°</p>
      </div>
    </section>
  );
}

export default CityCard;
