import { useRef, useState, useContext, useEffect } from 'react';
import { Dropdown, Input, SearchDropdownContent } from 'components';
import { cn, getIsInputValueValid } from 'utils';
import { useDebounce, useOutsideInteraction } from 'hooks';
import { SEARCH_STATUSES } from 'constants';
import { ApiService } from 'services';
import { BlurContext, WeatherContext } from 'context';
import styles from './WeatherSearch.module.css';

const MIN_SYMBOLS_TO_SEARCH = 3;

export const WeatherSearch = (props) => {
  const { isDropdownOpen, setIsDropdownOpen, className } = props;

  const { highlightHeader, unhighlightHeader } = useContext(BlurContext);
  const {
    setWeatherData,
    setIsWeatherDataFailed,
    history,
    onChangeHistory,
    onClearHistory,
  } = useContext(WeatherContext);

  const wrapperRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [searchStatus, setSearchStatus] = useState(SEARCH_STATUSES.history);
  const [queryCities, setQueryCities] = useState([]);
  const foundResult = useRef({});
  const debouncedInputValue = useDebounce(inputValue);

  const onInputChange = (value) => {
    if (!getIsInputValueValid(value)) {
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
    setSearchStatus(SEARCH_STATUSES.history);
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
      setSearchStatus(SEARCH_STATUSES.success);
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

  useOutsideInteraction(wrapperRef, onDropdownClose);

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

  useEffect(() => {
    if (debouncedInputValue.length >= MIN_SYMBOLS_TO_SEARCH) {
      fetchAndSetQueryCities(inputValue);
    }
    // eslint-disable-next-line
  }, [debouncedInputValue]);

  return (
    <div className={cn(styles.wrapper, className)} ref={wrapperRef}>
      <Input
        value={inputValue}
        onSubmit={onFormSubmit}
        onFocus={onDropdownOpen}
        onChange={(event) => {
          onInputChange(event.target.value);
        }}
        onClear={() => {
          onInputChange('');
        }}
        placeholder="Поиск по городу"
      />
      <Dropdown isOpen={isDropdownOpen} className={styles.dropdown}>
        <SearchDropdownContent
          searchStatus={searchStatus}
          history={history}
          queryCities={queryCities}
          clearHistory={onClearHistory}
          foundResult={foundResult.current}
          onSelectResult={onSelectResult}
          onSelectQueryCity={onSelectQueryCity}
          highlightedCityText={inputValue}
        />
      </Dropdown>
    </div>
  );
};
