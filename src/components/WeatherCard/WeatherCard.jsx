import { Icon } from 'components';
import { cn, getIsCityFavorite } from 'utils';
import { MAX_FAVORITE_CITIES } from 'constants';
import { useContext } from 'react';
import { WeatherContext } from 'contexts';
import styles from './WeatherCard.module.css';

export const WeatherCard = (props) => {
  const { cityInfo, onClick, className } = props;

  const { favoriteCities, onChangeFavoriteCities } = useContext(WeatherContext);

  const isFavorite = getIsCityFavorite(cityInfo.name, favoriteCities);
  const isLikeDisabled = favoriteCities.length >= MAX_FAVORITE_CITIES;

  return (
    <div className={cn(styles.wrapper, className)}>
      <button
        type="button"
        className={cn(styles.btn, 'btn-reset')}
        onClick={() => {
          onClick(cityInfo);
        }}
      >
        <span className={styles.text}>{cityInfo.name}</span>
      </button>
      <button
        type="button"
        onClick={() => {
          onChangeFavoriteCities(cityInfo);
        }}
        className={cn(styles.likeBtn, 'btn-reset')}
        disabled={isLikeDisabled && !isFavorite}
      >
        <Icon
          name={'heart'}
          className={cn(styles.likeIcon, {
            [styles.filled]: isFavorite,
          })}
        />
      </button>
    </div>
  );
};
