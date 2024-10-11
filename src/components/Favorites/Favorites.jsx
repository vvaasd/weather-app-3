import { MAX_FAVORITE_CITIES } from 'constants';
import { WeatherCard } from 'components';
import { useContext } from 'react';
import { WeatherContext } from 'contexts';
import styles from './Favorites.module.css';

export const Favorites = (props) => {
  const { onCitySelect } = props;

  const { favoriteCities } = useContext(WeatherContext);

  const favoritesCount = favoriteCities.length;

  if (favoritesCount === 0) {
    return null;
  }

  return (
    <div>
      <div className={styles.header}>
        <h3 className={styles.title}>Изранные</h3>
        <span
          className={styles.title}
        >{`${favoritesCount}/${MAX_FAVORITE_CITIES}`}</span>
      </div>
      <ul className={'list-reset'}>
        {favoriteCities.map((cityInfo) => (
          <li key={`favorite_${cityInfo.name}`}>
            <WeatherCard cityInfo={cityInfo} onClick={onCitySelect} />
          </li>
        ))}
      </ul>
    </div>
  );
};
