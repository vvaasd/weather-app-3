import { cn } from 'utils';
import { useRef, useState, useContext, useEffect } from 'react';
import { Dropdown, Input, SearchDropdownContent } from 'components';
import { useDebounce, useOutsideInteraction } from 'hooks';
import { SEARCH_STATUSES, LS_KEYS } from 'constants';
import { ApiService, StorageService, StringService } from 'services';
import { BlurContext, WeatherContext } from 'context';
import styles from './WeatherSearch.module.css';

const MIN_SYMBOLS_TO_SEARCH = 3;
const INPUT_DEBOUNCE_DELAY = 1000;

export const WeatherSearch = (props) => {
  const { isDropdownOpen, setIsDropdownOpen, className } = props;

  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const foundResultRef = useRef();
  const queryCitiesControllerRef = useRef();
  const { highlightHeader, unhighlightHeader } = useContext(BlurContext);
  const { setWeatherData, setIsWeatherDataFailed, onChangeHistory } =
    useContext(WeatherContext);
  const [inputValue, setInputValue] = useState('');
  const [searchStatus, setSearchStatus] = useState(SEARCH_STATUSES.history);
  const [queryCities, setQueryCities] = useState([]);
  const debouncedInputValue = useDebounce(inputValue, {
    delay: INPUT_DEBOUNCE_DELAY,
  });

  const onInputChange = (value) => {
    if (!StringService.getIsInputValueValid(value)) {
      return;
    }

    setInputValue(value);
    if (value.length >= MIN_SYMBOLS_TO_SEARCH) {
      setSearchStatus(SEARCH_STATUSES.loader);
    } else {
      setSearchStatus(SEARCH_STATUSES.history);
      setQueryCities([]);
    }
  };

  const onDropdownOpen = (searchStatus) => {
    setIsDropdownOpen(true);
    highlightHeader();
    setSearchStatus(searchStatus || SEARCH_STATUSES.history);
  };

  const onDropdownClose = () => {
    setIsDropdownOpen(false);
    unhighlightHeader();
  };

  const onSelectQueryCity = async (cityInfo) => {
    try {
      setSearchStatus(SEARCH_STATUSES.loadingResult);
      const newWeatherData = await ApiService.getWeatherData(cityInfo);

      foundResultRef.current = newWeatherData;

      setQueryCities([]);
      setSearchStatus(SEARCH_STATUSES.result);
      setIsWeatherDataFailed(false);
    } catch (error) {
      setSearchStatus(SEARCH_STATUSES.error);
      setIsWeatherDataFailed(true);
      console.log(error);
    }
  };

  const onSelectResult = (weatherData) => {
    setWeatherData(weatherData);
    onChangeHistory(weatherData);
    setInputValue('');
    onDropdownClose();
  };

  const fetchAndSetQueryCities = async (cityName) => {
    if (!cityName) {
      return;
    }

    try {
      if (queryCitiesControllerRef.current) {
        queryCitiesControllerRef.current.abort();
      }
      queryCitiesControllerRef.current = new AbortController();
      const signal = queryCitiesControllerRef.current.signal;

      setSearchStatus(SEARCH_STATUSES.loader);
      const citiesInfo = await ApiService.getCityInfo(cityName, {
        getArray: true,
        signal,
      });

      setQueryCities(citiesInfo);
      setSearchStatus(SEARCH_STATUSES.history);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setSearchStatus(SEARCH_STATUSES.notFound);
        setQueryCities([]);
        console.log(error);
      }
    }
  };

  const onConfirmGeolocation = (weatherData) => {
    const { city } = weatherData;
    StorageService.set(LS_KEYS.storedCity, { city });
    onChangeHistory(weatherData);
    setWeatherData(weatherData);
    onDropdownClose();
  };

  const onDenyGeolocation = () => {
    setSearchStatus(SEARCH_STATUSES.history);
    inputRef.current.focus();
  };

  useOutsideInteraction(wrapperRef, onDropdownClose);

  useEffect(() => {
    if (debouncedInputValue.length >= MIN_SYMBOLS_TO_SEARCH) {
      fetchAndSetQueryCities(inputValue);
    }
    // eslint-disable-next-line
  }, [debouncedInputValue]);

  return (
    <div className={cn(styles.wrapper, className)} ref={wrapperRef}>
      <Input
        ref={inputRef}
        placeholder="Поиск по городу"
        value={inputValue}
        onFocus={onDropdownOpen}
        onChange={(event) => {
          onInputChange(event.target.value);
        }}
        onClear={() => {
          onInputChange('');
        }}
        onClickGeolocation={() => {
          onDropdownOpen(SEARCH_STATUSES.geolocation);
        }}
      />
      <Dropdown isOpen={isDropdownOpen} className={styles.dropdown}>
        <SearchDropdownContent
          searchStatus={searchStatus}
          queryCities={queryCities}
          foundResult={foundResultRef.current}
          onSelectResult={onSelectResult}
          onSelectQueryCity={onSelectQueryCity}
          highlightedCityText={inputValue}
          onConfirmGeolocation={onConfirmGeolocation}
          onDenyGeolocation={onDenyGeolocation}
        />
      </Dropdown>
    </div>
  );
};
