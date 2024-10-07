import styles from './Logo.module.css';

function Logo() {
  return (
    <>
      <a href='/' rel='noreferrer'>
        <img className={styles.logo} alt='WeatherApp' />
      </a>
    </>
  );
}

export default Logo;
