import styles from './App.module.css';
import Header from '../header/Header';
import Main from '../main/Main';
import Footer from '../footer/Footer';
import Slider from '../slider/Slider';
import BlurContextProvider from '../../contexts/blur-context';
import WeatherContextProvider from '../../contexts/weather-context';

function App() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <WeatherContextProvider>
          <BlurContextProvider>
            <Header />
            <Main />
            <Slider />
            <Footer />
          </BlurContextProvider>
        </WeatherContextProvider>
      </div>
    </div>
  );
}

export default App;
