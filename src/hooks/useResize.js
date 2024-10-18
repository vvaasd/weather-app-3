import { BREAKPOINTS } from 'constants';
import { useEffect, useState } from 'react';

export const useResize = () => {
  const [screenTypeSize, setScreenTypeSize] = useState();

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth > BREAKPOINTS.tablet) {
        setScreenTypeSize(BREAKPOINTS.desktop);
      } else if (currentWidth > BREAKPOINTS.mobile) {
        setScreenTypeSize(BREAKPOINTS.tablet);
      } else {
        setScreenTypeSize(BREAKPOINTS.mobile);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return screenTypeSize;
};
