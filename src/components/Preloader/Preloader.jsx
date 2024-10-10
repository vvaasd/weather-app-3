import { cn } from 'utils';
import styles from './Preloader.module.css';

export const Preloader = (props) => {
  const { className, ...otherProps } = props;

  return (
    <div className={cn(styles.ldsEllipsis, className)} {...otherProps}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
