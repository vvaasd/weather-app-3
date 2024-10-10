import { SLIDER_TYPES } from 'constants';
import { Tab } from 'components';
import { cn } from 'utils';
import styles from './TabBar.module.css';

export const TabBar = ({ activeSliderType, handleSwitch }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Прогноз:</h2>
      <ul className={cn('list-reset', styles.tabList)}>
        <li>
          <Tab
            isActive={activeSliderType === SLIDER_TYPES.forOneDay}
            onClick={() => handleSwitch(SLIDER_TYPES.forOneDay)}
            text={'на 24 часа'}
          />
        </li>
        <li>
          <Tab
            isActive={activeSliderType === SLIDER_TYPES.forFiveDays}
            onClick={() => handleSwitch(SLIDER_TYPES.forFiveDays)}
            text={'на 5 дней'}
          />
        </li>
      </ul>
    </div>
  );
};
