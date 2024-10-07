import { useContext, useEffect, useRef, useState } from 'react';
import Dropdown from '../dropdown/Dropdown';
import Input from '../input/Input';
import styles from './WeatherSearch.module.css';
import { checkCity, validateInputValue } from '../../utils';
import { BlurContext } from '../../contexts/blur-context';
import { useOutsideAlerter } from '../../hooks';

const WeatherSearch = () => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState(null);
  const [wasSearch, setWasSearch] = useState(null);
  const { setIsBlur } = useContext(BlurContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!value.length) {
      return;
    }
    setLoading(true);
    const result = await checkCity(value);
    setLoading(false);
    setCurrentCity(result);
    setWasSearch(true);
  };

  const onChange = (e) => {
    setValue((prev) =>
      validateInputValue(e.target.value) ? e.target.value : prev
    );
  };

  const onClearInput = () => {
    setValue('');
    setWasSearch(false);
    setCurrentCity(null);
  };

  const setBlur = (action) => {
    setIsBlur(action);

    if (action) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  };

  const onClear = () => {
    setValue('');
    setWasSearch(false);
    setCurrentCity(null);
    setBlur(false);
    setIsOpen(false);
  };

  const onFocus = () => {
    setIsOpen(true);
    setBlur(true);
  };

  const ref = useRef(null);
  useOutsideAlerter(ref, () => {
    setBlur(false);
    setIsOpen(false);
  });

  useEffect(() => {}, []);

  return (
    <div className={styles.block} ref={ref}>
      <Input
        onSubmit={onSubmit}
        value={value}
        onFocus={onFocus}
        onChange={onChange}
        onClickClear={onClearInput}
        label="Поиск по городу"
      />
      <Dropdown
        className={styles.dropdown}
        isOpen={isOpen}
        searching={loading}
        wasSearch={wasSearch}
        currentCity={currentCity}
        onClear={onClear}
      />
    </div>
  );
};

export default WeatherSearch;
