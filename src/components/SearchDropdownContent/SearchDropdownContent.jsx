import { SEARCH_STATUSES, IMAGE_NAMES } from 'constants';
import { Preloader, Icon } from 'components';
import { cn } from 'utils';
import styles from './SearchDropdownContent.module.css';

export const SearchDropdownContent = (props) => {
  const { searchStatus, history, clearHistory, foundResult, onSelectResult } =
    props;

  let headerText = '';
  let content = null;

  switch (searchStatus) {
    case SEARCH_STATUSES.loading:
      headerText = 'Ищем...';
      content = (
        <div className={styles.loader}>
          <Preloader />
        </div>
      );
      break;

    case SEARCH_STATUSES.success:
      headerText = 'Результат поиска';
      content = (
        <button
          className={styles.historyBtn}
          onClick={() => {
            onSelectResult(foundResult);
          }}
        >
          <p className={styles.text}>{foundResult.name}</p>
        </button>
      );
      break;
    case SEARCH_STATUSES.history:
      headerText = 'Недавно смотрели';
      if (history.length === 0) {
        content = (
          <p className={cn(styles.text, styles.errorText)}>
            История поиска пустая.
          </p>
        );
      } else {
        content = (
          <ul className={styles.historyList}>
            {history
              .map((cityInfo, index) => (
                <li className={styles.historyElement} key={cityInfo.name}>
                  <button
                    className={styles.historyBtn}
                    onClick={() => {
                      onSelectResult(cityInfo);
                    }}
                  >
                    <p className={styles.text}>{cityInfo.name}</p>
                  </button>
                </li>
              ))
              .reverse()}
          </ul>
        );
      }
      break;

    case SEARCH_STATUSES.notFound:
      headerText = 'Упс! Город не найден';
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
    <>
      <div className={styles.headerAndBtnWrapper}>
        <h3 className={styles.header}>{headerText}</h3>
        {searchStatus === SEARCH_STATUSES.history && (
          <button
            onClick={clearHistory}
            disabled={history.length === 0}
            className={styles.clearHistoryBtn}
            type="button"
          >
            <Icon
              name={IMAGE_NAMES.trashBin}
              className={cn(styles.clearHistoryIcon, 'colored')}
            />
          </button>
        )}
      </div>
      {content}
    </>
  );
};
