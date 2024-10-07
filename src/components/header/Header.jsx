import Logo from '../logo/Logo';
import WeatherSearch from '../weatherSearch/WeatherSearch';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.wrapper}>
      <Logo />
      <WeatherSearch/>
    </header>
  );
}

export default Header;
