import { cn } from 'utils';
import styles from './Tab.module.css';

export const Tab = (props) => {
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
