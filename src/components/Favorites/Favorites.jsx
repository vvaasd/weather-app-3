import { useContext } from 'react';
import { MAX_FAVORITE_CITIES } from 'constants';
import { WeatherCard } from 'components';
import { WeatherContext } from 'context';
import { cn, getIsCityFavorite } from 'utils';
import styles from './Favorites.module.css';

export const Favorites = (props) => {
  const { onSelect } = props;

  const { favorites, onChangeFavorites } = useContext(WeatherContext);

  const favoritesCount = favorites.length;
  if (favoritesCount === 0) {
    return null;
  }

  return (
    <div>
      <div className={styles.header}>
        <h4 className={styles.title}>Изранные</h4>
        <span
          className={styles.title}
        >{`${favoritesCount}/${MAX_FAVORITE_CITIES}`}</span>
      </div>
      <ul className={cn(styles.list, 'list-reset')}>
        {favorites.map((favorite) => (
          <li key={`favorite_${favorite.city.id}`}>
            <WeatherCard
              className={styles.weatherCard}
              weatherData={favorite}
              onClick={onSelect}
              isFavorite={getIsCityFavorite(favorite.city.name, favorites)}
              isFavoriteBtnDisabled={favorites.length >= MAX_FAVORITE_CITIES}
              onClickFavorite={onChangeFavorites}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
