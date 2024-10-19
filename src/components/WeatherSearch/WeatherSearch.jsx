import { cn } from 'utils';
import { useRef, useState, useContext, useEffect } from 'react';
import { Dropdown, Input, SearchDropdownContent } from 'components';
import { useDebounce, useOutsideInteraction } from 'hooks';
import { SEARCH_STATUSES, LS_KEYS } from 'constants';
import { ApiService, StorageService, StringService } from 'services';
import { BlurContext, WeatherContext } from 'context';
import styles from './WeatherSearch.module.css';

const MIN_SYMBOLS_TO_SEARCH = 3;

export const WeatherSearch = (props) => {
  const { isDropdownOpen, setIsDropdownOpen, className } = props;

  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const foundResult = useRef({});
  const { highlightHeader, unhighlightHeader } = useContext(BlurContext);
  const { setWeatherData, setIsWeatherDataFailed, onChangeHistory } =
    useContext(WeatherContext);
  const [inputValue, setInputValue] = useState('');
  const [searchStatus, setSearchStatus] = useState(SEARCH_STATUSES.history);
  const [queryCities, setQueryCities] = useState([]);
  const debouncedInputValue = useDebounce(inputValue);

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

  const onDropdownOpen = () => {
    setIsDropdownOpen(true);
    highlightHeader();
  };

  const onDropdownClose = () => {
    setIsDropdownOpen(false);
    unhighlightHeader();
  };

  const onSelectQueryCity = async (cityInfo) => {
    setSearchStatus(SEARCH_STATUSES.loadingResult);
    try {
      const newWeatherData = await ApiService.getWeatherData(cityInfo);

      foundResult.current = newWeatherData;

      setQueryCities([]);
      setSearchStatus(SEARCH_STATUSES.result);
      setIsWeatherDataFailed(false);
    } catch (error) {
      console.log(error);
      setSearchStatus(SEARCH_STATUSES.error);
      setIsWeatherDataFailed(true);
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

    setSearchStatus(SEARCH_STATUSES.loader);
    try {
      const citiesInfo = await ApiService.getCityInfo(cityName, {
        getArray: true,
      });

      setQueryCities(citiesInfo);
      setSearchStatus(SEARCH_STATUSES.history);
    } catch (error) {
      console.log(error);
      setSearchStatus(SEARCH_STATUSES.notFound);
      setQueryCities([]);
    }
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    fetchAndSetQueryCities(inputValue);
  };

  const onClickGeolocation = () => {
    onDropdownOpen();
    setSearchStatus(SEARCH_STATUSES.geolocation);
  };

  const onConfirmGeolocation = (weatherData) => {
    const { city } = weatherData;
    StorageService.set(LS_KEYS.storedCity, { city });
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
        onSubmit={onFormSubmit}
        onFocus={onDropdownOpen}
        onChange={(event) => {
          onInputChange(event.target.value);
        }}
        onClear={() => {
          onInputChange('');
        }}
        onClickGeolocation={onClickGeolocation}
      />
      <Dropdown isOpen={isDropdownOpen} className={styles.dropdown}>
        <SearchDropdownContent
          searchStatus={searchStatus}
          queryCities={queryCities}
          foundResult={foundResult.current}
          onSelectResult={onSelectResult}
          onSelectQueryCity={onSelectQueryCity}
          highlightedCityText={inputValue}
          onDropdownClose={onDropdownClose}
          setSearchStatus={setSearchStatus}
          onConfirmGeolocation={onConfirmGeolocation}
          onDenyGeolocation={onDenyGeolocation}
        />
      </Dropdown>
    </div>
  );
};
