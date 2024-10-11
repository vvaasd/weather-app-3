import { SEARCH_STATUSES, IMAGE_NAMES } from 'constants';
import { Preloader, Icon, WeatherCard, Favorites } from 'components';
import { cn } from 'utils';
import styles from './SearchDropdownContent.module.css';

export const SearchDropdownContent = (props) => {
  const { searchStatus, history, clearHistory, foundResult, onSelectResult } =
    props;

  let title = '';
  let content = null;

  switch (searchStatus) {
    case SEARCH_STATUSES.loading:
      title = 'Ищем...';
      content = (
        <div className={styles.loaderWrapper}>
          <Preloader className={styles.loader} />
        </div>
      );
      break;

    case SEARCH_STATUSES.success:
      title = 'Результат поиска';
      content = <WeatherCard cityInfo={foundResult} onClick={onSelectResult} />;
      break;

    case SEARCH_STATUSES.history:
      title = 'Недавно смотрели';
      if (history.length === 0) {
        content = (
          <p className={cn(styles.text, styles.errorText)}>
            История поиска пустая.
          </p>
        );
      } else {
        content = (
          <>
            <ul className={'list-reset'}>
              {history
                .map((cityInfo) => (
                  <li key={cityInfo.name}>
                    <WeatherCard cityInfo={cityInfo} onClick={onSelectResult} />
                  </li>
                ))
                .reverse()}
            </ul>
          </>
        );
      }
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
      {searchStatus === SEARCH_STATUSES.history && (
        <Favorites onCitySelect={onSelectResult} />
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
