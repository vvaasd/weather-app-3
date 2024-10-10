import { cn } from 'utils';
import styles from './Button.module.css';

export const Button = (props) => {
  const { children, className, ...otherProps } = props;

  return (
    <button
      className={cn('btn-reset', styles.button, { className })}
      {...otherProps}
    >
      {children}
    </button>
  );
};
