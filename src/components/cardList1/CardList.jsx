import { Card } from 'components';
import { useContext } from 'react';
import { WeatherContext } from 'contexts';
import {
  cn,
  getWindDirection,
  getConvertedPressure,
  getPressureType,
  getVisibilityType,
  getTimeDifferenceInfo,
} from 'utils';
import { CardSkeleton } from 'components';
import styles from './CardList.module.css';

export const CardList = () => {
  const { currentWeather, isLoading } = useContext(WeatherContext);

  if (isLoading || !currentWeather) {
    return (
      <ul className={cn(styles.list, 'list-reset')}>
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index}>
            <CardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  const convertedPressureValue = Math.round(
    getConvertedPressure(currentWeather.pressure),
  );
  const pressureDescription = getPressureType(currentWeather.pressure);

  const pressurePbValue = convertedPressureValue - 700;

  const convertedVisibility = Math.round(currentWeather.visibility / 1000);
  const visibilityDescription = getVisibilityType(convertedVisibility);
  const visibilityPbValue = convertedVisibility * 10;

  const [sunriseTimeStr, sunriseDescription] = getTimeDifferenceInfo(
    currentWeather.sunriseMs,
    currentWeather.timezoneMs,
  );
  const [sunsetTimeStr, sunsetDescription] = getTimeDifferenceInfo(
    currentWeather.sunsetMs,
    currentWeather.timezoneMs,
  );

  const windDescription = getWindDirection(currentWeather.wind.deg);

  return (
    <ul className={cn(styles.list, 'list-reset')}>
      <li>
        <Card
          title={'Влажность'}
          iconName={'humidity'}
          value={currentWeather.humidity}
          hasProgressBar={true}
          pbValue={currentWeather.humidity}
          units={'%'}
          gradientPb={false}
          min={0}
          max={100}
        />
      </li>
      <li>
        <Card
          title={'Давление'}
          iconName={'pressure'}
          value={convertedPressureValue}
          hasProgressBar={true}
          pbValue={pressurePbValue}
          gradientPb={true}
          description={pressureDescription}
        />
      </li>
      <li>
        <Card
          title={'Видимость'}
          iconName={'visibility'}
          value={convertedVisibility}
          hasProgressBar={true}
          pbValue={visibilityPbValue}
          units={'км'}
          gradientPb={false}
          description={visibilityDescription}
        />
      </li>
      <li>
        <Card
          title={'Рассвет'}
          iconName={'sunrise'}
          value={sunriseTimeStr}
          description={sunriseDescription}
        />
      </li>
      <li>
        <Card
          title={'Закат'}
          iconName={'sunset'}
          value={sunsetTimeStr}
          description={sunsetDescription}
        />
      </li>
      <li>
        <Card
          title={'Сила ветра'}
          iconName={'wind'}
          value={Math.round(currentWeather.wind.speed)}
          units={'м/с'}
          imgRotationDeg={currentWeather.wind.deg - 45 + 180}
          description={windDescription}
        />
      </li>
    </ul>
  );
};
