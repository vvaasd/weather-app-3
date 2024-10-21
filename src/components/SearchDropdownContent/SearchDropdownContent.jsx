import { SEARCH_STATUSES, IMAGE_NAMES, MAX_FAVORITE_CITIES } from 'constants';
import {
  Preloader,
  Icon,
  WeatherCard,
  Favorites,
  WeatherCardSkeleton,
  Error,
  Button,
} from 'components';
import { cn, getIsCityFavorite } from 'utils';
import { StringService } from 'services';
import { useContext } from 'react';
import { WeatherContext } from 'context';
import styles from './SearchDropdownContent.module.css';

export const SearchDropdownContent = (props) => {
  const {
    searchStatus,
    queryCities,
    onSelectQueryCity,
    foundResult,
    onSelectResult,
    highlightedCityText,
    onConfirmGeolocation,
    onDenyGeolocation,
  } = props;

  const {
    favorites,
    onChangeFavorites,
    history,
    onClearHistory,
    geolocationWeatherData,
    isGeolocationFailed,
    isGeolocationLoading,
  } = useContext(WeatherContext);

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

    case SEARCH_STATUSES.geolocation:
      if (isGeolocationFailed) {
        title = 'Местоположение не определено';
        content = (
          <div className={styles.list}>
            <p className={cn(styles.text, styles.errorText)}>
              К сожалению, не удалось определить вашу геопозицию.
            </p>
            <p className={cn(styles.text, styles.errorText)}>
              Воспользуйтесь поиском или попробуйте
              <br />
              еще раз позднее.
            </p>
          </div>
        );
      } else if (isGeolocationLoading) {
        title = 'Определяем геолокацию...';
        content = <WeatherCardSkeleton className={styles.weatherCard} />;
      } else {
        title = 'Вы находитесь в этом городе?';
        content = (
          <>
            <WeatherCard
              className={styles.weatherCard}
              onClick={onSelectResult}
              weatherData={geolocationWeatherData}
            />
            <div className={styles.confirm}>
              <Button noBackground onClick={onDenyGeolocation}>
                Нет
              </Button>
              <Button
                onClick={() => {
                  onConfirmGeolocation(geolocationWeatherData);
                }}
              >
                Да
              </Button>
            </div>
          </>
        );
      }
      break;

    case SEARCH_STATUSES.result:
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
          content = (
            <ul className={cn(styles.list, 'list-reset')}>
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
              const [highlightedPart, unhighlightedPart] =
                StringService.splitStringByStart(
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
                        {StringService.upperCaseFirst(highlightedPart)}
                      </span>
                    )}
                    {unhighlightedPart && (
                      <span className={cn(styles.text, styles.unhighlighted)}>
                        {highlightedPart
                          ? unhighlightedPart
                          : StringService.upperCaseFirst(unhighlightedPart)}
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

    case SEARCH_STATUSES.geolocationError:
      title = 'Местоположение не определено';
      content = (
        <div className={styles.list}>
          <p className={cn(styles.text, styles.errorText)}>
            К сожалению, не удалось определить вашу геопозицию.
          </p>
          <p className={cn(styles.text, styles.errorText)}>
            Воспользуйтесь поиском или попробуйте
            <br />
            еще раз позднее.
          </p>
        </div>
      );
      break;

    default:
      break;
  }

  const isShownHistory =
    searchStatus === SEARCH_STATUSES.history && !queryCities.length;

  return (
    <div className={styles.wrapper}>
      {isShownHistory && <Favorites onSelect={onSelectResult} />}
      <div>
        <div className={styles.header}>
          <h4 className={styles.title}>{title}</h4>
          {isShownHistory && (
            <button
              type="button"
              onClick={onClearHistory}
              disabled={history.length === 0}
              className={cn(styles.clearHistoryBtn, 'btn-reset')}
            >
              <Icon
                name={IMAGE_NAMES.trashBin}
                className={styles.clearHistoryIcon}
              />
            </button>
          )}
        </div>
        {content}
      </div>
    </div>
  );
};
