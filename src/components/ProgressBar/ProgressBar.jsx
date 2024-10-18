import { cn } from 'utils';
import styles from './ProgressBar.module.css';

export const ProgressBar = (props) => {
  const { current, type, ...otherProps } = props;

  const validCurrent = Math.max(Math.min(current, 97), 2);

  return (
    <div className={styles.wrapper} {...otherProps}>
      <div
        className={styles.barTumbler}
        style={{ '--progress-position': `${validCurrent}%` }}
      ></div>
      <div
        className={cn(styles.barStripe, {
          [styles.gradient]: type === 'gradient',
        })}
        style={{
          '--progress-position': `${validCurrent}%`,
        }}
      ></div>
    </div>
  );
};
