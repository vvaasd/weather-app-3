import { Icon, WeatherCardSkeleton } from 'components';
import { cn, upperCaseFirst } from 'utils';
import { DateService } from 'services';

import styles from './WeatherCard.module.css';

export const WeatherCard = (props) => {
  const {
    weatherData,
    onClick,
    isFavorite,
    onClickFavorite,
    isFavoriteBtnDisabled,
    className,
  } = props;

  if (weatherData?.isError || !weatherData?.weather) {
    return (
      <WeatherCardSkeleton
        className={className}
        isError={weatherData?.isError}
      />
    );
  }

  const dateByTimezone = DateService.getTimeByTimezone(
    new Date(),
    weatherData.weather.now.timezoneMs,
  );
  const timeText = DateService.getFormattedShortTime(dateByTimezone);

  return (
    <div className={cn(styles.wrapper, className)}>
      <button
        type="button"
        className={cn(styles.btn, 'btn-reset')}
        onClick={() => {
          onClick(weatherData);
        }}
      >
        <span className={styles.block}>
          <span className={styles.title}>{weatherData.city.name}</span>
          <span className={styles.title}>
            {weatherData.weather.now.temperature}°
          </span>
        </span>
        <span className={styles.block}>
          <span className={styles.text}>{timeText}</span>
          <span className={styles.text}>
            {upperCaseFirst(weatherData.weather.now.weatherType)}
          </span>
        </span>
      </button>
      <div className={styles.rightContent}>
        <button
          type="button"
          onClick={() => {
            onClickFavorite(weatherData);
          }}
          className={cn(styles.likeBtn, 'btn-reset')}
          disabled={isFavoriteBtnDisabled && !isFavorite}
        >
          <Icon
            name={'heart'}
            className={cn(styles.likeIcon, {
              [styles.filled]: isFavorite,
            })}
          />
        </button>
      </div>
    </div>
  );
};
