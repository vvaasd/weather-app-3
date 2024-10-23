import { cn } from 'utils';
import styles from './Card.module.css';

export const CardSkeleton = () => {
  return (
    <article className={styles.card}>
      <div className={cn(styles.titleSkeleton, 'skeleton')} />
      <div className={cn(styles.iconSkeleton, 'skeleton')} />
      <div className={cn(styles.valueSkeleton, 'skeleton')} />
      <div className={cn(styles.bottomSkeleton, 'skeleton')} />
    </article>
  );
};
