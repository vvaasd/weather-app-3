import styles from './CardList.module.css';
import Card from '../card/Card';
import { useContext, useEffect } from 'react';
import { WeatherContext } from '../../contexts/weather-context';
import {
  calсulateDirection,
  getDescriptionPressure,
  getTime,
} from '../../utils';

function CardList() {
  const { humidity, pressure, visibility, wind, sunrise, sunset, timezone } =
    useContext(WeatherContext);
  const data = [
    {
      id: 1,
      title: 'Влажность',
      icon: '/images/icons/cards/humidity.svg',
      value: `${humidity} %`,
      barPosition: humidity,
      descriptions: ['0%', '100%'],
    },
    {
      id: 2,
      title: 'Давление',
      icon: '/images/icons/cards/pressure.svg',
      value: pressure,
      barPosition: Math.floor(pressure - 700),
      description: getDescriptionPressure(pressure),
    },
    {
      id: 3,
      title: 'Видимость',
      icon: '/images/icons/cards/visibility.svg',
      value: `${visibility} км`,
      barPosition: visibility * 10,
      description: 'Нормальная',
    },
    {
      id: 4,
      title: 'Рассвет',
      icon: '/images/icons/cards/sunrise.svg',
      value: getTime(sunrise, timezone).time,
      info: getTime(sunrise, timezone).diffDescription,
    },
    {
      id: 5,
      title: 'Закат',
      icon: '/images/icons/cards/sunset.svg',
      value: getTime(sunset, timezone).time,
      info: getTime(sunset, timezone).diffDescription,
    },
    {
      id: 6,
      title: 'Сила ветра',
      icon: '/images/icons/cards/direction.svg',
      value: `${Math.round(wind?.speed)} м/с`,
      info: calсulateDirection(wind?.deg),
    },
  ];

  useEffect(() => {
    const windIcon = document.getElementById('6');
    windIcon.setAttribute(
      'style',
      `transform: rotate(${wind?.deg + 45 + 180}deg)`
    );
  }, [wind?.deg]);

  return (
    <div className={styles.containerWrapper}>
      <ul className={styles.containerForecast}>
        {data.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default CardList;
