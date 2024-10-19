import { cn } from 'utils';
import styles from './Button.module.css';

export const Button = (props) => {
  const { children, className, noCursorEffects, noBackground, ...otherProps } =
    props;

  return (
    <button
      type="button"
      className={cn('btn-reset', styles.button, className, {
        [styles.noCursorEffects]: noCursorEffects,
        [styles.noBackground]: noBackground,
      })}
      {...otherProps}
    >
      {children}
    </button>
  );
};
