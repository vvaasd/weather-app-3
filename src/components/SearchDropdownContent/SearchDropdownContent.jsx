import { SEARCH_STATUSES, IMAGE_NAMES, MAX_FAVORITE_CITIES } from 'constants';
import {
  Preloader,
  Icon,
  WeatherCard,
  Favorites,
  WeatherCardSkeleton,
  Error,
} from 'components';
import {
  cn,
  getIsCityFavorite,
  splitStringByStart,
  upperCaseFirst,
} from 'utils';
import { useContext } from 'react';
import { WeatherContext } from 'context';
import styles from './SearchDropdownContent.module.css';

export const SearchDropdownContent = (props) => {
  const {
    searchStatus,
    history,
    clearHistory,
    queryCities,
    onSelectQueryCity,
    foundResult,
    onSelectResult,
    highlightedCityText,
  } = props;

  const { favorites, onChangeFavorites } = useContext(WeatherContext);

  let title = '';
  let content = null;
  switch (searchStatus) {
    case SEARCH_STATUSES.loader:
      title = 'Ищем...';
      content = (
        <div className={styles.loaderWrapper}>
          <Preloader className={styles.loader} />
        </div>
      );
      break;

    case SEARCH_STATUSES.loadingResult:
      title = 'Ищем...';
      content = <WeatherCardSkeleton className={styles.weatherCard} />;
      break;

    case SEARCH_STATUSES.success:
      title = 'Результат поиска';
      content = (
        <WeatherCard
          className={styles.weatherCard}
          weatherData={foundResult}
          onClick={onSelectResult}
          isFavorite={getIsCityFavorite(foundResult?.city?.name, favorites)}
          isFavoriteBtnDisabled={favorites.length >= MAX_FAVORITE_CITIES}
          onClickFavorite={onChangeFavorites}
        />
      );
      break;

    case SEARCH_STATUSES.history:
      if (!queryCities.length) {
        title = 'Недавно смотрели';
        if (history.length === 0) {
          content = (
            <p className={cn(styles.text, styles.errorText)}>
              История поиска пустая.
            </p>
          );
        } else {
          console.log(history);
          content = (
            <ul className={cn(styles.cardsList, 'list-reset')}>
              {history
                .map((historyElement) => (
                  <li key={`history-city_${historyElement.city.id}`}>
                    <WeatherCard
                      className={styles.weatherCard}
                      weatherData={historyElement}
                      onClick={onSelectResult}
                      isFavorite={getIsCityFavorite(
                        historyElement?.city?.name,
                        favorites,
                      )}
                      isFavoriteBtnDisabled={
                        favorites.length >= MAX_FAVORITE_CITIES
                      }
                      onClickFavorite={onChangeFavorites}
                    />
                  </li>
                ))
                .reverse()}
            </ul>
          );
        }
      } else {
        title = 'Города по запросу';
        content = (
          <ul className={'list-reset'}>
            {queryCities.map((cityInfo) => {
              const [highlightedPart, unhighlightedPart] = splitStringByStart(
                cityInfo.name,
                highlightedCityText,
              );

              return (
                <li
                  className={styles.queryCity}
                  key={`query-city_${cityInfo.id}`}
                >
                  <button
                    type="button"
                    className={cn(styles.queryCityBtn, 'btn-reset')}
                    onClick={() => {
                      onSelectQueryCity(cityInfo);
                    }}
                  >
                    {highlightedPart && (
                      <span className={cn(styles.text, styles.highlighted)}>
                        {upperCaseFirst(highlightedPart)}
                      </span>
                    )}
                    {unhighlightedPart && (
                      <span className={cn(styles.text, styles.unhighlighted)}>
                        {highlightedPart
                          ? unhighlightedPart
                          : upperCaseFirst(unhighlightedPart)}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        );
      }
      break;

    case SEARCH_STATUSES.error:
      title = 'Упс! Произошла ошибка';
      content = <Error message={null} className={styles.error} />;
      break;

    case SEARCH_STATUSES.notFound:
      title = 'Упс! Город не найден';
      content = (
        <p className={cn(styles.text, styles.errorText)}>
          Попробуйте другое название.
        </p>
      );
      break;

    default:
      break;
  }

  return (
    <div className={styles.wrapper}>
      {searchStatus === SEARCH_STATUSES.history && !queryCities.length && (
        <Favorites onSelect={onSelectResult} />
      )}
      <div>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {searchStatus === SEARCH_STATUSES.history && (
            <button
              type="button"
              onClick={clearHistory}
              disabled={history.length === 0}
              className={styles.clearHistoryBtn}
            >
              <Icon
                name={IMAGE_NAMES.trashBin}
                className={cn(styles.clearHistoryIcon, 'colored')}
              />
            </button>
          )}
        </div>
        {content}
      </div>
    </div>
  );
};
