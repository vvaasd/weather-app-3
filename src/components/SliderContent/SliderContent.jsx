import { useState, useRef, useEffect, useContext } from 'react';
import { Button, Icon, SliderCardSkeleton, Error } from 'components';
import { useElementWidth } from 'hooks';
import { IMAGE_NAMES } from 'constants';
import { WeatherContext } from 'context';
import { cn } from 'utils';
import styles from './SliderContent.module.css';

const THROTTLE_INTERVAL = 150;
const CARD_ACCURACY = 10;

export const SliderContent = (props) => {
  const { activeSlider } = props;

  const { weatherData, isWeatherDataFailed } = useContext(WeatherContext);

  const sliderRef = useRef(null);
  const sliderContentRef = useRef(null);
  const cardsRefs = useRef([]);
  const [translateX, setTranslateX] = useState(0);
  const [stepValue, setStepValue] = useState(0);
  const sliderWidth = useElementWidth(sliderRef, THROTTLE_INTERVAL);
  const sliderContentWidth = useElementWidth(
    sliderContentRef,
    THROTTLE_INTERVAL,
  );
  const endTranslate = sliderWidth - sliderContentWidth;

  const forecast = weatherData?.weather?.forecast || null;
  const sliderData = forecast ? forecast[activeSlider] : null;

  const translateToStart = () => {
    setTranslateX(0);
  };

  const updateStepValue = () => {
    translateToStart();
    if (cardsRefs.current.length > 0) {
      setStepValue(cardsRefs.current[0]?.clientWidth);
    }
  };

  const translateLeft = () => {
    setTranslateX((prev) => (prev + stepValue >= 0 ? 0 : prev + stepValue));
  };

  const translateRight = () => {
    setTranslateX((prev) =>
      prev <= endTranslate + stepValue + CARD_ACCURACY
        ? endTranslate
        : prev - stepValue,
    );
  };

  useEffect(() => {
    updateStepValue();
    // eslint-disable-next-line
  }, [activeSlider, weatherData, sliderWidth, sliderContentWidth]);

  if (isWeatherDataFailed) {
    return <Error message={null} subMessage={null} className={styles.error} />;
  }

  return (
    <div className={styles.wrapper}>
      <Button disabled={translateX === 0} onClick={translateLeft}>
        <Icon name={IMAGE_NAMES.arrowLeft} className={styles.btnIcon} />
      </Button>
      <div
        className={cn(styles.sliderLimiter, {
          [styles.maskRight]: endTranslate <= translateX,
          [styles.maskInline]: translateX < 0,
          [styles.maskLeft]: translateX === endTranslate,
        })}
        ref={sliderRef}
      >
        <ul
          className={cn(styles.cardList, 'list-reset')}
          style={{ transform: `translateX(${translateX}px)` }}
          ref={sliderContentRef}
        >
          {sliderData
            ? sliderData.map((cardData, index) => (
                <li
                  key={cardData.time}
                  ref={(el) => (cardsRefs.current[index] = el)}
                >
                  <div className={styles.card}>
                    <time className={styles.text}>{cardData.time}</time>
                    <img
                      src={`/images/weather-type/${cardData.imgName}.svg`}
                      alt={cardData.imgName}
                      className={styles.cardImg}
                    />

                    <span className={styles.text}>
                      {cardData.temperatureStr}
                    </span>
                  </div>
                </li>
              ))
            : Array.from({ length: 5 }).map((_, index) => (
                <li key={index} ref={(el) => (cardsRefs.current[index] = el)}>
                  <SliderCardSkeleton />
                </li>
              ))}
        </ul>
      </div>
      <Button disabled={translateX <= endTranslate} onClick={translateRight}>
        <Icon
          name={IMAGE_NAMES.arrowLeft}
          className={cn(styles.btnIcon, styles.arrowRight)}
        />
      </Button>
    </div>
  );
};
