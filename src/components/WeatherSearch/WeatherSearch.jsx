import { useRef, useState, useContext } from 'react';
import { Dropdown, Input, SearchDropdownContent } from 'components';
import { getIsInputValueValid } from 'utils';
import { useOutsideInteraction } from 'hooks';
import { SEARCH_STATUSES, LS_KEYS } from 'constants';
import { ApiService, StorageService } from 'services';
import { ApplicationContext, WeatherContext } from 'contexts';
import styles from './WeatherSearch.module.css';

const MAX_HISTORY_LENGTH = 5;

export const WeatherSearch = () => {
  const { setCurrentCity } = useContext(WeatherContext);
  const { highlightHeader, unhighlightHeader } = useContext(ApplicationContext);

  const wrapperRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchStatus, setSearchStatus] = useState(SEARCH_STATUSES.history);
  const [history, setHistory] = useState(
    StorageService.get(LS_KEYS.citiesHistory) || [],
  );
  const foundCity = useRef(
    StorageService.get(LS_KEYS.citiesHistory)?.slice(-1) || null,
  );

  const onPushToHistory = (cityInfo) => {
    const newCities = [...history];

    const cityIndex = newCities.findIndex(
      (city) => city.name === cityInfo.name,
    );

    if (cityIndex !== -1) {
      newCities.splice(cityIndex, 1);
    } else if (newCities.length >= MAX_HISTORY_LENGTH) {
      newCities.shift();
    }
    newCities.push(cityInfo);

    StorageService.set(LS_KEYS.citiesHistory, newCities);
    setHistory(newCities);
  };

  const clearHistory = () => {
    StorageService.remove(LS_KEYS.citiesHistory);
    setHistory([]);
  };

  const onInputChange = (value) => {
    if (getIsInputValueValid(value)) {
      setInputValue(value);
    }
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (searchStatus === SEARCH_STATUSES.loading) {
      return;
    }

    setSearchStatus(SEARCH_STATUSES.loading);
    ApiService.getCityInfo(inputValue)
      .then((cityInfo) => {
        foundCity.current = cityInfo;
        setSearchStatus(SEARCH_STATUSES.success);
      })
      .catch((error) => {
        console.log(error);
        setSearchStatus(SEARCH_STATUSES.notFound);
      });
  };

  const onDropdownOpen = () => {
    setSearchStatus(SEARCH_STATUSES.history);
    setIsDropdownOpen(true);
    highlightHeader();
  };

  const onDropdownClose = () => {
    setSearchStatus(SEARCH_STATUSES.history);
    setIsDropdownOpen(false);
    unhighlightHeader();
  };

  const onSelectCity = (city) => {
    onPushToHistory(city);
    setCurrentCity(city);
    onDropdownClose();
    setInputValue('');
  };

  useOutsideInteraction(wrapperRef, onDropdownClose);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <Input
        value={inputValue}
        onSubmit={onFormSubmit}
        onFocus={onDropdownOpen}
        onChange={(event) => {
          onInputChange(event.target.value);
        }}
        onClear={() => {
          setInputValue('');
        }}
        placeholder="Поиск по городу"
      />
      <Dropdown isOpen={isDropdownOpen} className={styles.dropdown}>
        <SearchDropdownContent
          searchStatus={searchStatus}
          history={history}
          clearHistory={clearHistory}
          foundResult={foundCity.current}
          onSelectResult={onSelectCity}
        />
      </Dropdown>
    </div>
  );
};
