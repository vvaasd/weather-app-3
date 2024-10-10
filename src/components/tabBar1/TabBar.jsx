import { SLIDER_TYPES } from 'constants';
import { cn } from 'utils';
import styles from './TabBar.module.css';

const Tab = (props) => {
  const { isActive, onClick, text, className, ...otherProps } = props;

  return (
    <button
      className={cn('btn-reset', styles.btn, {
        [styles.active]: isActive,
        className,
      })}
      onClick={onClick}
      {...otherProps}
    >
      <span className={styles.btnText}>{text}</span>
    </button>
  );
};

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
