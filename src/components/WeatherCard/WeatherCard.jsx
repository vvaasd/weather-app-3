import { Icon, WeatherCardSkeleton } from 'components';
import { cn, upperCaseFirst } from 'utils';
import { DateService } from 'services';

import styles from './WeatherCard.module.css';

export const WeatherCard = (props) => {
  const {
    cityAndWeatherInfo,
    onClick,
    isFavorite,
    onClickFavorite,
    isFavoriteBtnDisabled,
    className,
  } = props;

  if (!cityAndWeatherInfo.weather) {
    return <WeatherCardSkeleton className={className} />;
  }

  const dateByTimezone = DateService.getTimeByTimezone(
    new Date(),
    cityAndWeatherInfo.weather.now.timezoneMs,
  );
  const timeText = DateService.getFormattedShortTime(dateByTimezone);

  return (
    <div className={cn(styles.wrapper, className)}>
      <button
        type="button"
        className={cn(styles.btn, 'btn-reset')}
        onClick={() => {
          onClick(cityAndWeatherInfo);
        }}
      >
        <span className={styles.block}>
          <span className={styles.title}>{cityAndWeatherInfo.city.name}</span>
          <span className={styles.title}>
            {cityAndWeatherInfo.weather.now.temperature}°
          </span>
        </span>
        <span className={styles.block}>
          <span className={styles.text}>{timeText}</span>
          <span className={styles.text}>
            {upperCaseFirst(cityAndWeatherInfo.weather.now.weatherType)}
          </span>
        </span>
      </button>
      <div className={styles.rightContent}>
        <button
          type="button"
          onClick={() => {
            onClickFavorite(cityAndWeatherInfo);
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
