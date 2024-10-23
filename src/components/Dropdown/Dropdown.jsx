import { cn } from 'utils';
import styles from './Dropdown.module.css';

export const Dropdown = (props) => {
  const { className, isOpen, children, ...otherProps } = props;

  return (
    <div
      className={cn(styles.dropdown, isOpen && styles.shown, className)}
      {...otherProps}
    >
      {children}
    </div>
  );
};
