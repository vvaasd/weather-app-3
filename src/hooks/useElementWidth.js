import { useState, useEffect } from 'react';
import { throttle } from 'utils';

export const useElementWidth = (
  ref,
  options = { resizeThrottleInterval: 150 },
) => {
  const [width, setWidth] = useState(
    ref.current ? ref.current?.clientWidth : 0,
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver(
      throttle((entries) => {
        const entry = entries[0];
        const contentBoxSize = entry.contentBoxSize;

        const entryWidth = contentBoxSize
          ? contentBoxSize[0].inlineSize
          : entry.contentRect.width;

        setWidth(entryWidth);
      }, options.resizeThrottleInterval),
    );

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  return width;
};
