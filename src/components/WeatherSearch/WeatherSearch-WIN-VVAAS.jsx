import { useRef, useState, useContext, useEffect } from 'react';
import { Dropdown, Input, SearchDropdownContent } from 'components';
import { getIsInputValueValid } from 'utils';
import { useDebounce, useOutsideInteraction } from 'hooks';
import { SEARCH_STATUSES, LS_KEYS } from 'constants';
import { ApiService, StorageService } from 'services';
import { ApplicationContext, WeatherContext } from 'contexts';
import styles from './WeatherSearch.module.css';

const MAX_HISTORY_LENGTH = 5;

export const WeatherSearch = () => {
  const { setCurrentCity, setCurrentWeather, setForecast } =
    useContext(WeatherContext);
  const { highlightHeader, unhighlightHeader } = useContext(ApplicationContext);

  const wrapperRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchStatus, setSearchStatus] = useState(SEARCH_STATUSES.history);
  const [queryCities, setQueryCities] = useState([]);
  const [history, setHistory] = useState(
    StorageService.get(LS_KEYS.citiesHistory) || [],
  );
  const foundCity = useRef(
    StorageService.get(LS_KEYS.citiesHistory)?.slice(-1) || null,
  );
  const debouncedInputValue = useDebounce(inputValue);

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

  const onSelectReuslt = (cityInfoWithWeather) => {
    const { lat, lon, name, id, weather } = cityInfoWithWeather;

    onPushToHistory({ lat, lon, name, id });
    setCurrentCity({ lat, lon, name, id });
    setCurrentWeather(weather.now);
    setForecast(weather.forecast);
    onDropdownClose();
    setInputValue('');
  };

  const onSelectQueryCity = (cityInfo) => {
    event.preventDefault();

    if (searchStatus === SEARCH_STATUSES.loading || queryCities.length === 0) {
      return;
    }

    // setSearchStatus(SEARCH_STATUSES.loading);

    foundCity.current = queryCities[0];

    // setSearchStatus(SEARCH_STATUSES.success);

    // setSearchStatus(SEARCH_STATUSES.notFound);
  };

  useOutsideInteraction(wrapperRef, onDropdownClose);

  useEffect(() => {
    if (debouncedInputValue.length >= 3) {
      ApiService.getCityInfo(inputValue, {
        array: true,
      })
        .then((citiesInfo) => {
          setQueryCities(citiesInfo);
          setSearchStatus(SEARCH_STATUSES.history);
        })
        .catch((error) => {
          setSearchStatus(SEARCH_STATUSES.notFound);
          setQueryCities([]);
          console.log(error);
        });
    } else {
      setSearchStatus(SEARCH_STATUSES.history);
      setQueryCities([]);
    }
  }, [debouncedInputValue]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <Input
        value={inputValue}
        onSubmit={(event) => {
          event.preventDefault();
        }}
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
          queryCities={queryCities}
          clearHistory={clearHistory}
          foundResult={foundCity.current}
          onSelectResult={onSelectCity}
          onSelectQueryCity={onSelectQueryCity}
          highlightedCityText={inputValue}
        />
      </Dropdown>
    </div>
  );
};
