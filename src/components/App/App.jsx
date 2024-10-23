import { useContext, useLayoutEffect, useRef } from 'react';
import { Footer, CityCard, CardList, Header, Slider, Error } from 'components';
import { BlurContext, ThemeContext, WeatherContext } from 'context';
import { background } from 'assets/img/background';
import styles from './App.module.css';

export const App = () => {
  const wrapperRef = useRef(null);
  const contentToBlurRef = useRef(null);

  const { weatherData, isWeatherDataFailed } = useContext(WeatherContext);
  const { theme } = useContext(ThemeContext);

  const highlightHeader = () => {
    contentToBlurRef.current.classList.add('blur');
    document.body.style.overflowY = 'hidden';
  };

  const unhighlightHeader = () => {
    contentToBlurRef.current.classList.remove('blur');
    document.body.style.overflowY = 'auto';
  };

  useLayoutEffect(() => {
    if (weatherData?.weather) {
      const imageKey = weatherData.weather.now.iconName.substr(0, 2);
      wrapperRef.current.style.backgroundImage = `url('${background[imageKey][theme]}')`;
    }
  }, [weatherData, theme]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.container}>
        <BlurContext.Provider value={{ highlightHeader, unhighlightHeader }}>
          <Header />
        </BlurContext.Provider>
        <div ref={contentToBlurRef}>
          {!isWeatherDataFailed ? (
            <main className={styles.main}>
              <CityCard weatherData={weatherData} />
              <CardList weatherData={weatherData} />
            </main>
          ) : (
            <Error className={styles.error} isLarge isLight />
          )}
          <Slider />
          <Footer />
        </div>
      </div>
    </div>
  );
};
