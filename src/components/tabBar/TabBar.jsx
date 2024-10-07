import styles from './TabBar.module.css';
import { SLIDER_TYPES } from '../../constants/SLIDER_TYPES';

function TabBar({ activeSliderType, handleSwitch }) {
  return (
    <div className={styles.sliderSwitcher}>
      <h2>Прогноз:</h2>
      <div className={styles.switcher}>
        <button
          className={`${styles.switcherButton} ${
            activeSliderType === SLIDER_TYPES.forOneDay ? styles.active : ''
          }`}
          onClick={() => handleSwitch(SLIDER_TYPES.forOneDay)}
        >
          на 24 часа
        </button>
        <button
          className={`${styles.switcherButton} ${
            activeSliderType === SLIDER_TYPES.forFiveDays ? styles.active : ''
          }`}
          onClick={() => handleSwitch(SLIDER_TYPES.forFiveDays)}
        >
          на 5 дней
        </button>
      </div>
    </div>
  );
}

export default TabBar;
