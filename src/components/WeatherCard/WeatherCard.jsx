import { Icon, WeatherCardSkeleton } from 'components';
import { cn } from 'utils';
import { DateService, StringService } from 'services';
import { IMAGE_NAMES } from 'constants';
import { useContext, useLayoutEffect, useRef } from 'react';
import { background } from 'assets/img/background';
import styles from './WeatherCard.module.css';
import { ThemeContext } from 'context';

export const WeatherCard = (props) => {
  const {
    weatherData,
    onClick,
    isFavorite,
    onClickFavorite,
    isFavoriteBtnDisabled,
    className,
  } = props;

  const { theme } = useContext(ThemeContext);

  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    if (weatherData?.weather && wrapperRef?.current) {
      const imageKey = weatherData.weather.now.iconName.substr(0, 2);
      wrapperRef.current.style.backgroundImage = `url('${background[imageKey][theme]}')`;
    }
  }, [weatherData, theme]);

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
    <div className={cn(styles.wrapper, className)} ref={wrapperRef}>
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
            {StringService.upperCaseFirst(weatherData.weather.now.weatherType)}
          </span>
        </span>
      </button>
      {isFavorite !== undefined && (
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
              name={IMAGE_NAMES.heart}
              className={cn(styles.likeIcon, {
                [styles.filled]: isFavorite,
              })}
            />
          </button>
        </div>
      )}
    </div>
  );
};
