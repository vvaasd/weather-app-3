import { SLIDER_TYPES } from 'constants';
import { Tab } from 'components';
import { cn } from 'utils';
import styles from './TabBar.module.css';

export const TabBar = ({ activeSliderType, handleSwitch }) => {
  const onSwitchToFiveDays = () => {
    handleSwitch(SLIDER_TYPES.forFiveDays);
  };

  const onSwitchToOneDay = () => {
    handleSwitch(SLIDER_TYPES.forOneDay);
  };

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>Прогноз:</h5>
      <ul className={cn('list-reset', styles.tabList)}>
        <li>
          <Tab
            isActive={activeSliderType === SLIDER_TYPES.forOneDay}
            onClick={onSwitchToOneDay}
            text={'на 24 часа'}
          />
        </li>
        <li>
          <Tab
            isActive={activeSliderType === SLIDER_TYPES.forFiveDays}
            onClick={onSwitchToFiveDays}
            text={'на 5 дней'}
          />
        </li>
      </ul>
    </div>
  );
};
