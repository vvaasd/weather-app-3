import { cn } from 'utils';
import styles from './SliderContent.module.css';

export const SliderCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={cn(styles.textSkeleton, 'skeleton')} />
      <div className={cn(styles.imgSkeleton, 'skeleton')} />
      <div className={cn(styles.textSkeleton, 'skeleton')} />
    </div>
  );
};
