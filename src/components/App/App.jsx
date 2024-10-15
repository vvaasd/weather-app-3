import { useContext, useRef } from 'react';
import { Footer, CityCard, CardList, Header, Slider, Error } from 'components';
import { BlurContext, WeatherContext } from 'context';
import styles from './App.module.css';

export const App = () => {
  const { weatherData, isWeatherDataFailed } = useContext(WeatherContext);

  const contentToBlurRef = useRef(null);

  const highlightHeader = () => {
    contentToBlurRef.current.classList.add('blur');
    document.body.style.overflow = 'hidden';
  };

  const unhighlightHeader = () => {
    contentToBlurRef.current.classList.remove('blur');
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={styles.wrapper}>
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
