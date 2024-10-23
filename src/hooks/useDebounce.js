import { useState, useEffect } from 'react';

export const useDebounce = (value, options = { delay: 1000 }) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, options.delay);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [value, options]);

  return debouncedValue;
};
