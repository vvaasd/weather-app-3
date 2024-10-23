import { cn } from 'utils';
import { Error } from 'components';
import styles from './WeatherCard.module.css';

export const WeatherCardSkeleton = (props) => {
  const { className, isError, ...otherProps } = props;

  return (
    <div
      className={cn(styles.wrapper, styles.skeleton, className)}
      {...otherProps}
    >
      {isError ? (
        <Error className={styles.error} />
      ) : (
        <div className={styles.btn}>
          <span className={styles.block}>
            <span className={cn(styles.leftTitleSkeleton, 'skeleton')} />
            <span className={cn(styles.rightTitleSkeleton, 'skeleton')} />
          </span>
          <span className={styles.block}>
            <span className={cn(styles.textSkeleton, 'skeleton')} />
            <span className={cn(styles.textSkeleton, 'skeleton')} />
          </span>
        </div>
      )}
    </div>
  );
};
