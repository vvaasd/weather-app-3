import { useRef } from 'react';
import { Footer, CityCard, CardList, Header, Slider } from 'components';
import { WeatherContextProvider } from 'providers';
import { ApplicationContext } from 'contexts';
import styles from './App.module.css';

export const App = () => {
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
        <ApplicationContext.Provider
          value={{ highlightHeader, unhighlightHeader }}
        >
          <WeatherContextProvider>
            <Header />
            <div ref={contentToBlurRef}>
              <main className={styles.main}>
                <CityCard />
                <CardList />
              </main>
              <Slider />
              <Footer />
            </div>
          </WeatherContextProvider>
        </ApplicationContext.Provider>
      </div>
    </div>
  );
};
