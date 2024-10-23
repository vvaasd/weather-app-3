import { useEffect } from 'react';

export const useOutsideInteraction = (ref, callback) => {
  useEffect(() => {
    const handleOutsideInteraction = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback && callback();
      }
    };

    document.addEventListener('mousedown', handleOutsideInteraction);
    document.addEventListener('focusin', handleOutsideInteraction);

    return () => {
      document.removeEventListener('mousedown', handleOutsideInteraction);
      document.removeEventListener('focusin', handleOutsideInteraction);
    };
  }, [ref, callback]);
};
